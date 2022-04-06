import json
import os

from flask import abort, request, jsonify, current_app
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect
from werkzeug.utils import secure_filename

from app.admin import admin
from app.models import Node
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user
import pandas as pd
from pandas import DataFrame, read_csv

from app.utils.uploads import content_folder


@admin.route('/node', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listNode():
    node = Node.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in node))


@admin.route('/node', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_node():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    node = Node(
        school_id=data['school_id'],
        growcube_code=data['growcube_code'],
        mac_address=data['mac_address'],
        last_communication_date=data['last_communication_date'],
        next_communication_date=data['next_communication_date'],
        health_status=data['health_status'],
        status=data['status']

    )

    db.session.add(node)
    return_status = 200
    message = "New node has been registered"

    try:
        db.session.commit()
        audit_create("node", node.id, current_user.id)
        return jsonify({"message": message, "id": node.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/node/<int:id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_one_node(id):
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


@admin.route('/node/<int:id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def updateNode(id):
    current_user = jwt_user(get_jwt_identity())
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
            abort(409)


@admin.route('/node/<int:id>', methods=['DELETE'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def delete_node(id):
    current_user = jwt_user(get_jwt_identity())
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
        abort(409, e.orig.msg)


@admin.route('/node/<int:id>/uploadData', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def upload_data(id):
    Node.query.get_or_404(id)  # if node id doens't exist, it returns a 404 message
    id = str(id)
    json_data = request.get_json()

    s = json.dumps(json_data)
    j = json.loads(s)  # <-- Convert JSON string, s, to JSON object, j, with j = json.loads(s)

    for cube_level in ('top', 'middle', 'bottom'):

        new_data_df = pd.DataFrame(j[cube_level], index=[j["timestamp"]])
        new_data_df.index = pd.to_datetime(new_data_df.index)
        new_data_df.index.name = "timestamp"

        folder_location = current_app.config['DATA_ROOT_PATH']
        newdir =  os.path.join(content_folder("DATA_ROOT", id, "FLASK",upload=True))
        # newdir = (os.path.join(folder_location, id))  # content_folder function when merged with main

        try:
            df = pd.read_csv(os.path.join(newdir, cube_level + '.csv'), index_col="timestamp")
            df = pd.concat([df, new_data_df])
        except:
            df = new_data_df
        df.to_csv(os.path.join(newdir, cube_level + '.csv'))

    return j
