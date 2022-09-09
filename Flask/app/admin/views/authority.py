from flask import request, jsonify, abort
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import Authority
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user
from app.utils.error_messages import abort_db


# This route is PUBLIC
@admin.route('/authority', methods=['GET'])
def listAuthority():
    authority = Authority.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in authority))


@admin.route('/authority', methods=['POST'])
@jwt_required()
def add_authority():
    dummy = request
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    authority = Authority(
        name = data['name'],
        telephone = data['telephone'],
        email = data['email']
    )

    db.session.add(authority)
    return_status = 200
    message = "New authority has been registered"

    try:
        db.session.commit()
        audit_create("authority", authority.id, current_user.id)
        return {"message": message, "id": authority.id}

    except Exception as e:
        db.session.rollback()
        abort_db(e)


# This route is PUBLIC
@admin.route('/authority/<int:id>', methods=['GET'])
def get_one_authority(id):
    authority = Authority.query.get_or_404(id)

    authority_data = {}
    authority_data['authority_id'] = authority.id
    authority_data['name'] = authority.name
    authority_data['telephone'] = authority.telephone
    authority_data['email'] = authority.email

    return {'Authority': authority_data}


@admin.route('/authority/<int:id>', methods=['PUT'])
@jwt_required()
def updateAuthority(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    authority_to_update = Authority.query.get_or_404(id)
    new_data = request.get_json()

    if new_data['name'] == "":
        abort(400, "Authority name cannot be null")

    authority_to_update.name = new_data["name"]
    authority_to_update.telephone = new_data["telephone"]
    authority_to_update.email = new_data["email"]

    audit_details = prepare_audit_details(inspect(Authority), authority_to_update, delete=False)

    message = "Authority has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("authority", authority_to_update.id, audit_details, current_user.id)
            return {"message": message}

        except Exception as e:
            db.session.rollback()
            abort_db(e)
    else:
        return({'error': 'Authority record was not changed'})


@admin.route('/authority/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_authority(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    authority_to_delete = Authority.query.filter_by(id=id).first()
    if not authority_to_delete:
        return jsonify({"error" : "No Authority found"})

    audit_details = prepare_audit_details(inspect(Authority), authority_to_delete, delete = True)
    db.session.delete(authority_to_delete)
    message = "The Authority has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", authority_to_delete.id, audit_details, current_user.id)
        return {"message" : message, "id": authority_to_delete.id}

    except Exception as e:
        db.session.rollback()
        abort_db(e)
