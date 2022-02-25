from flask import render_template, url_for, redirect, request, jsonify, abort
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.admin.forms.authority import AuthorityForm
from app.models import Authority
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user


@admin.route('/authority', methods=['GET'])
@jwt_required()
def listAuthority():
    authority = Authority.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in authority))


@admin.route('/authority', methods=['POST'])
@jwt_required()
def add_authority():
    current_user = jwt_user(get_jwt_identity())
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
        return jsonify({"message": message, "id": authority.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/authority/<int:id>', methods=['GET'])
@jwt_required()
def get_one_authority(id):
    authority = Authority.query.get_or_404(id)

    authority_data = {}
    authority_data['authority_id'] = authority.id
    authority_data['name'] = authority.name
    authority_data['telephone'] = authority.telephone
    authority_data['email'] = authority.email

    return jsonify({'Authority': authority_data})


@admin.route('/authority/<int:id>', methods=['PUT'])
@jwt_required()
def updateAuthority(id):
    current_user = jwt_user(get_jwt_identity())
    authority_to_update = Authority.query.get_or_404(id)
    new_data = request.get_json()

    authority_to_update.name = new_data["name"]
    authority_to_update.telephone = new_data["telephone"]
    authority_to_update.email = new_data["email"]

    audit_details = prepare_audit_details(inspect(Authority), authority_to_update, delete=False)

    message = "Authority has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("authority", authority_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/authority/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_authority(id):
    current_user = jwt_user(get_jwt_identity())
    authority_to_delete = Authority.query.filter_by(id=id).first()
    if not authority_to_delete:
        return jsonify({"message" : "No Authority found"})

    audit_details = prepare_audit_details(inspect(Authority), authority_to_delete, delete = True)
    db.session.delete(authority_to_delete)
    return_status = 200
    message = "The Authority has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", authority_to_delete.id, audit_details, current_user.id)
        return jsonify({"message" : message, "id": authority_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)



# @admin.route('/authority/add', methods=['POST'])
# @jwt_required()
# def add_authority():
#     newName = request.form['name']
#     newTelephone = request.form['telephone']
#     newEmail = request.form['email']
#     authority = Authority(name=newName, telephone=newTelephone, email=newEmail)
#     db.session.add(authority)
#     db.session.commit()
#     return "<p>Data is Updated</p>"








