from flask import render_template, url_for, redirect, abort, request, jsonify
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import School
from app import db
from app.utils.auditing import audit_create, audit_update, prepare_audit_details, audit_delete
from app.utils.functions import row2dict, jwt_user


@admin.route('/school', methods=['GET'])
@jwt_required()
def listSchool():
    school = School.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in school))


@admin.route('/school', methods=['POST'])
@jwt_required()
def add_school():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    school = School(
        authority_id = data['authority_id'],
        name = data['name'],
        address_line_1 = data['address_line_1'],
        address_line_2 = data['address_line_2'],
        town = data['town'],
        postcode = data['postcode'],
        telephone = data['telephone'],
        email = data['email'],
        school_image_link = data['school_image_link'],
        status = data['status'],
        latitude = data['latitude'],
        longitude = data['longitude']
    )

    db.session.add(school)
    return_status = 200
    message = "New school has been registered "

    try:
        db.session.commit()
        audit_create("school", school.id, current_user.id)
        return jsonify({"message": message, "id": school.id})


    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/school/<int:id>', methods=['GET'])
@jwt_required()
def getOneSchool(id):
    school = School.query.get_or_404(id)

    school_data = {}
    school_data['school_id'] = school.id
    school_data['authority_id'] = school.authority_id
    school_data['name'] = school.name
    school_data['status'] = school.status

    return jsonify({'school': school_data})



@admin.route('/school/<int:id>', methods=['PUT'])
@jwt_required()
def updateSchool(id):
    current_user = jwt_user(get_jwt_identity())
    school_to_update = School.query.get_or_404(id)
    new_data = request.get_json()

    school_to_update.authority_id = new_data["authority_id"]
    school_to_update.name = new_data["name"]
    school_to_update.address_line_1 = new_data["address_line_1"]
    school_to_update.address_line_2 = new_data["address_line_2"]
    school_to_update.town = new_data["town"]
    school_to_update.postcode = new_data["postcode"]
    school_to_update.telephone = new_data["telephone"]
    school_to_update.email = new_data["email"]
    school_to_update.school_image_link = new_data["school_image_link"]
    school_to_update.status = new_data["status"]
    school_to_update.latitude = new_data["latitude"]
    school_to_update.longitude = new_data["longitude"]

    audit_details = prepare_audit_details(inspect(School), school_to_update)

    message = "School has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("school", school_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/school/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_school(id):
    current_user = jwt_user(get_jwt_identity())
    school = School.query.filter_by(id=id).first()

    if not school:
        return jsonify({"message" : "No school found"})

    db.session.delete(school)
    return_status = 200
    message = "The school has been deleted"

    try:
        db.session.commit()
        audit_delete("school", school.id, current_user.id)
        return jsonify({"message": message, "id": school.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)