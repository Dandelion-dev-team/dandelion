import os

from flask import abort, request
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect
from flask_cors import cross_origin
from app.admin import admin
from app.models import School
from app import db
from app.utils.auditing import audit_create, audit_update, prepare_audit_details, audit_delete
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user
from app.utils.images import image_processing
from app.utils.uploads import content_folder

from app.utils.uploads import get_uploaded_file

@admin.route('/school', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listSchool():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    school = School.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in school))

@admin.route('/school', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_school():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    school = School(
        authority_id=data['authority_id'],
        name=data['name'],
        address_line_1=data['address_line_1'],
        address_line_2=data['address_line_2'],
        town=data['town'],
        postcode=data['postcode'],
        telephone=data['telephone'],
        email=data['email'],
        school_image_link=data['school_image_link'],
        status=data['status'],
        latitude=data['latitude'],
        longitude=data['longitude']
    )

    db.session.add(school)
    return_status = 200
    message = "New school has been registered "

    try:
        db.session.commit()
        audit_create("school", school.id, current_user.id)
        return {"message": message, "id": school.id}


    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/school/<int:id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def getOneSchool(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    school = School.query.get_or_404(id)

    school_data = {}
    school_data['school_id'] = school.id
    school_data['authority_id'] = school.authority_id
    school_data['name'] = school.name
    school_data['status'] = school.status
    school_data['address_line_1'] = school.address_line_1
    school_data['address_line_2'] = school.address_line_2
    school_data['postcode'] = school.postcode
    school_data['town'] = school.town
    school_data['telephone'] = school.telephone
    school_data['email'] = school.email
    school_data['latitude'] = school.latitude
    school_data['longitude'] = school.longitude
    school_data['image_full'] = os.path.join(content_folder('school', id, 'image'), 'full.png')
    school_data['image_thumb'] = os.path.join(content_folder('school', id, 'image'), 'thumb.png')

    return {'school': school_data}







@admin.route('/school/<int:id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def updateSchool(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
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

    audit_details = prepare_audit_details(inspect(School), school_to_update, delete=False)

    message = "School has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("school", school_to_update.id, audit_details, current_user.id)
            return {"message": message}

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/school/<int:id>', methods=['DELETE'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def delete_school(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    school_to_delete = School.query.filter_by(id=id).first()
    if not school_to_delete:
        return {"message": "No school found"}

    audit_details = prepare_audit_details(inspect(School), school_to_delete, delete=True)
    db.session.delete(school_to_delete)
    return_status = 200
    message = "The school has been deleted"

    try:
        db.session.commit()
        audit_delete("school", school_to_delete.id, audit_details, current_user.id)
        return {"message": message, "id": school_to_delete.id}

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/school/<int:id>/uploadImage', methods=['POST'])
def upload_school_image(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'school', id, filename)

    return {"message": "School image has been uploaded"}
