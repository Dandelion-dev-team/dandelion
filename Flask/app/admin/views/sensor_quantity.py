from flask import abort, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import SensorQuantity
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.authorisation import auth_check
from app.utils.functions import jwt_user


@admin.route('/sensorQuantity', methods=['POST'])
@jwt_required()
def add_sensor_quantity():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    sensor_quantity = SensorQuantity(
        sensor_id = data['sensor_id'],
        quantity_id = data['quantity_id'],
    )

    db.session.add(sensor_quantity)
    return_status = 200
    message = "New sensor quantity has been registered"

    try:
        db.session.commit()
        audit_create("sensor", sensor_quantity.id, current_user.id)
        return jsonify({"message": message, "id": sensor_quantity.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


# This route is PUBLIC
@admin.route('/sensorQuantity/<int:id>', methods=['GET'])
def get_one_sensor_quantity(id):
    sensor_quantity = SensorQuantity.query.get_or_404(id)


    sensor_quantity_data = {}
    sensor_quantity_data['sensor_quantity_id'] = sensor_quantity.id
    sensor_quantity_data['sensor_id'] = sensor_quantity.sensor_id
    sensor_quantity_data['quantity_id'] = sensor_quantity.quantity_id

    return jsonify({'SensorQuantity': sensor_quantity_data})


@admin.route('/sensorQuantity/<int:id>', methods=['PUT'])
@jwt_required()
def Update_sensory_quantity(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    sensor_quantity_to_update = SensorQuantity.query.get_or_404(id)
    new_data = request.get_json()

    sensor_quantity_to_update.sensor_id = new_data["sensor_id"]
    sensor_quantity_to_update.quantity_id = new_data["quantity_id"]

    audit_details = prepare_audit_details(inspect(SensorQuantity), sensor_quantity_to_update, delete=False)

    message = "Sensor Quantity has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("sensor", sensor_quantity_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/sensorQuantity/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_sensor_quantity(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    sensor_quantity_to_delete = SensorQuantity.query.filter_by(id=id).first()

    if not sensor_quantity_to_delete:
        return jsonify({"message" : "No Sensor Quantity found"})

    audit_details = prepare_audit_details(inspect(SensorQuantity), sensor_quantity_to_delete, delete = True)
    db.session.delete(sensor_quantity_to_delete)
    return_status = 200
    message = "The Sensor Quantity has been deleted"

    try:
        db.session.commit()
        audit_delete("sensor", sensor_quantity_to_delete.id, audit_details, current_user.id)
        return jsonify({"message" : message, "id": sensor_quantity_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)
