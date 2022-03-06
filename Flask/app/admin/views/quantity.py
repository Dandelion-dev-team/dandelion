from os import abort
from flask import request, jsonify
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect
from app.admin import admin
from app.models import Quantity
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user


@admin.route('/quantity', methods=['GET'])
@jwt_required()
def listQuantity():
    quantity = Quantity.query.all()
    return json_response(data=(row2dict(x, summary=False) for x in quantity))


@admin.route('/quantity', methods=['POST'])
@jwt_required()
def add_quantity():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    quantity = Quantity(
        name = data['name'],
        unit = data['unit'],
        help_url = data['help_url']
    )

    db.session.add(quantity)
    return_status = 200
    message = "New Quantity has been registered"

    try:
        db.session.commit()
        audit_create("school", quantity.id, current_user.id)
        return jsonify({"message": message, "id": quantity.id})


    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/quantity/<int:id>', methods=['GET'])
@jwt_required()
def getOneQuantity(id):
    quantity = Quantity.query.get_or_404(id)

    quantity_data = {}
    quantity_data['quantity_id'] = quantity.id
    quantity_data['name'] = quantity.name
    quantity_data['unit'] = quantity.unit
    quantity_data['help_url'] = quantity.help_url

    return jsonify({'quantity': quantity_data})


@admin.route('/quantity/<int:id>', methods=['PUT'])
@jwt_required()
def updateQuantity(id):
    current_user = jwt_user(get_jwt_identity())
    quantity_to_update = Quantity.query.get_or_404(id)
    new_data = request.get_json()

    quantity_to_update.name = new_data['name']
    quantity_to_update.unit = new_data['unit']
    quantity_to_update.help_url = new_data['help_url']

    audit_details = prepare_audit_details(inspect(Quantity), quantity_to_update, delete=False)

    message = "Quantity has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("quantity", quantity_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/quantity/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_quantity(id):
    current_user = jwt_user(get_jwt_identity())
    quantity_to_delete = Quantity.query.filter_by(id=id).first()
    if not quantity_to_delete:
        return jsonify({"message" : "No quantity found"})

    audit_details = prepare_audit_details(inspect(Quantity), quantity_to_delete, delete=True)
    db.session.delete(quantity_to_delete)
    return_status = 200
    message = "The quantity has been deleted"

    try:
        db.session.commit()
        audit_delete("quantity", quantity_to_delete.id, audit_details, current_user.id)
        return jsonify({"message": message, "id": quantity_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)


