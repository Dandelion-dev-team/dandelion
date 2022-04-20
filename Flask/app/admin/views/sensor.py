from flask import abort, request, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import Sensor
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.authorisation import check_authorisation, auth_check
from app.utils.functions import row2dict, jwt_user


@admin.route('/sensor', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listSensor():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    sensor = Sensor.query.all()
    return json_response(data=(row2dict(x, summary=False) for x in sensor))


@admin.route('/sensor', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_sensor():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    sensor = Sensor(
        code = data['code'],
        description = data['description'],
        URL = data['URL'],
        datasheet_link = data['datasheet_link']

    )

    db.session.add(sensor)
    return_status = 200
    message = "New sensor has been registered"

    try:
        db.session.commit()
        audit_create("sensor", sensor.id, current_user.id)
        return jsonify({"message": message, "id": sensor.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/sensor/<int:id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_one_sensor(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    sensor = Sensor.query.get_or_404(id)

    sensor_data = {}
    sensor_data['sensor_id'] = sensor.id
    sensor_data['code'] = sensor.code
    sensor_data['description'] = sensor.description
    sensor_data['URL'] = sensor.URL
    sensor_data['datasheet_link'] = sensor.datasheet_link

    return jsonify({'Sensor': sensor_data})


@admin.route('/sensor/<int:id>', methods=['PUT'])
@jwt_required()
def updateSensor(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    sensor_to_update = Sensor.query.get_or_404(id)
    new_data = request.get_json()

    sensor_to_update.code = new_data["code"]
    sensor_to_update.description = new_data["description"]
    sensor_to_update.URL = new_data["URL"]
    sensor_to_update.datasheet_link = new_data["datasheet_link"]

    audit_details = prepare_audit_details(inspect(Sensor), sensor_to_update, delete=False)

    message = "Sensor has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("sensor", sensor_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/sensor/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_sensor(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    sensor_to_delete = Sensor.query.filter_by(id=id).first()
    if not sensor_to_delete:
        return jsonify({"message" : "No Sensor found"})

    audit_details = prepare_audit_details(inspect(Sensor), sensor_to_delete, delete = True)
    db.session.delete(sensor_to_delete)
    return_status = 200
    message = "The Sensor has been deleted"

    try:
        db.session.commit()
        audit_delete("sensor", sensor_to_delete.id, audit_details, current_user.id)
        return jsonify({"message" : message, "id": sensor_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)
