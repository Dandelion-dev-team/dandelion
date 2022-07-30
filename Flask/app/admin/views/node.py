import json
import os

from flask import abort, request, jsonify, current_app
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect
from werkzeug.utils import secure_filename

from app.admin import admin
from app.models import Node, NodeSensor, Sensor, sensor
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.authorisation import auth_check
from app.utils.error_messages import abort_db
from app.utils.functions import row2dict, jwt_user
import pandas as pd
from pandas import DataFrame, read_csv

from app.utils.uploads import content_folder


@admin.route('/node', methods=['GET'])
@jwt_required()
def listNode():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    node = Node.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in node))


@admin.route('/node', methods=['POST'])
@jwt_required()
def add_node():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    sensors = Sensor.query.all()

    data = request.get_json()

    if db.session.query(db.exists().where(Node.mac_address == data['mac_address'])).scalar():
        message = "Node mac address already exists in database"
        abort(409, message)

    node = Node(
        school_id=data['school_id'],
        growcube_code=data['growcube_code'],
        mac_address=data['mac_address'],
        last_communication_date=None,
        next_communication_date=None,
        health_status=None,
        status='active'
    )

    db.session.add(node)

    try:
        db.session.commit()
        audit_create("node", node.id, current_user.id)

    except Exception as e:
        db.session.rollback()
        abort_db(e)

    for sensor in sensors:
        code = sensor.code
        sensor_id = sensor.id
        if code == "SHTC3" or code == "BH1750": # These two sensors are only present in the top level
            node_sensor = NodeSensor(
                node_id=node.id,
                sensor_id=sensor_id,
                status="active",
                cube_level="top"
            )

            db.session.add(node_sensor)

            try:
                db.session.commit()
                audit_create("node_sensor", node_sensor.id, current_user.id)

            except Exception as e:
                db.session.rollback()
                abort_db(e)

        elif code == "SEN0244" or code == "DS18B20" or code == "SEN0161" or code == "SEN0193":
            for cube_level in ("top", "middle", "bottom"):
                node_sensor = NodeSensor(
                    node_id=node.id,
                    sensor_id=sensor_id,
                    status="active",
                    cube_level=cube_level
                )

                db.session.add(node_sensor)

                try:
                    db.session.commit()
                    audit_create("node_sensor", node_sensor.id, current_user.id)

                except Exception as e:
                    db.session.rollback()
                    abort_db(e)

    message = "Node has been registered"
    return jsonify({"message" : message})


@admin.route('/node/<int:id>', methods=['GET'])
@jwt_required()
def get_one_node(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)

    node = Node.query.get_or_404(id)

    node_data = {}
    node_data['node_id'] = node.id
    node_data['school_id'] = node.school_id
    node_data['growcube_code'] = node.growcube_code
    node_data['mac_address'] = node.mac_address
    node_data['last_communication_date'] = node.last_communication_date
    node_data['next_communication_date'] = node.next_communication_date
    node_data['health_status'] = node.health_status
    node_data['status'] = node.status

    return jsonify({'Node': node_data})



@admin.route('/node/byschool/<int:id>', methods=['GET'])
@jwt_required()
def get_node_by_school(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)

    node = Node.query.filter(Node.school_id == id).first()

    if node:
        node_data = {}
        node_data['node_id'] = node.id
        node_data['school_id'] = node.school_id
        node_data['growcube_code'] = node.growcube_code
        node_data['mac_address'] = node.mac_address
        node_data['last_communication_date'] = node.last_communication_date
        node_data['next_communication_date'] = node.next_communication_date
        node_data['health_status'] = node.health_status
        node_data['status'] = node.status

        return jsonify({'Node': node_data})

    return jsonify({'Node': None})

@admin.route('/node/<int:id>', methods=['PUT'])
@jwt_required()
def updateNode(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    node_to_update = Node.query.get_or_404(id)
    new_data = request.get_json()

    node_to_update.school_id = new_data["school_id"]
    node_to_update.growcube_code = new_data["growcube_code"]
    node_to_update.mac_address = new_data["mac_address"]
    node_to_update.last_communication_date = new_data["last_communication_date"]
    node_to_update.next_communication_date = new_data["next_communication_date"]
    node_to_update.health_status = new_data["health_status"]
    node_to_update.status = new_data["status"]

    audit_details = prepare_audit_details(inspect(Node), node_to_update, delete=False)

    message = "Node has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("authority", node_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort_db(e)


@admin.route('/node/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_node(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    node_to_delete = Node.query.filter_by(id=id).first()
    if not node_to_delete:
        return jsonify({"message": "No Node found"})

    audit_details = prepare_audit_details(inspect(Node), node_to_delete, delete=True)
    db.session.delete(node_to_delete)
    return_status = 200
    message = "The Node has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", node_to_delete.id, audit_details, current_user.id)
        return jsonify({"message": message, "id": node_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort_db(e)


# This route is PUBLIC
@admin.route('/node/latest/<int:node_id>', methods=['GET'])
def get_latest_data(node_id):
    Node.query.get_or_404(node_id)  # if node id doens't exist, it returns a 404 message
    str(node_id)

    for cube_level in ('top', 'middle', 'bottom'):
        dir = os.path.join(content_folder("DATA_ROOT", node_id, "FLASK",
                                          upload=True))  # creates the path for the correct file to be read in the next line
        df_to_read = pd.read_csv(os.path.join(dir, cube_level + '.csv'),
                                 index_col="timestamp")  # reads the correct .csv file

        if cube_level == "top":
            out_top = []
            last_row = df_to_read.iloc[-1]  # gets the last rown from the dataframe
            output_top = {}
            output_top['air_temp'] = last_row.values[0]
            output_top['humidity'] = last_row.values[2]
            output_top['lux'] = last_row.values[3]
            output_top['pressure'] = last_row.values[6]
            output_top['sub_temp'] = last_row.values[7]
            output_top['moisture'] = last_row.values[4]
            output_top['ec'] = last_row.values[1]
            output_top['pH'] = last_row.values[5]
            output_top['water_level'] = last_row.values[8]
            out_top.append(output_top)
        elif cube_level == "middle":
            out_middle = []
            last_row = df_to_read.iloc[-1]
            output_middle = {}
            output_middle['air_temp'] = last_row.values[0]
            output_middle['humidity'] = last_row.values[2]
            output_middle['lux'] = last_row.values[3]
            output_middle['pressure'] = last_row.values[6]
            output_middle['sub_temp'] = last_row.values[7]
            output_middle['moisture'] = last_row.values[4]
            output_middle['ec'] = last_row.values[1]
            output_middle['pH'] = last_row.values[5]
            output_middle['water_level'] = last_row.values[8]
            out_middle.append(output_middle)
        else:
            out_bottom = []
            last_row = df_to_read.iloc[-1]
            output_bottom = {}
            output_bottom['air_temp'] = last_row.values[0]
            output_bottom['humidity'] = last_row.values[2]
            output_bottom['lux'] = last_row.values[3]
            output_bottom['pressure'] = last_row.values[6]
            output_bottom['sub_temp'] = last_row.values[7]
            output_bottom['moisture'] = last_row.values[4]
            output_bottom['ec'] = last_row.values[1]
            output_bottom['pH'] = last_row.values[5]
            output_bottom['water_level'] = last_row.values[8]
            out_bottom.append(output_bottom)

    return jsonify({'top': output_top, 'middle': output_middle, 'bottom': output_bottom})
