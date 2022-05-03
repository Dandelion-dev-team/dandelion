from flask import abort, request, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import Observation
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user
from app.utils.images import image_processing
from app.utils.uploads import get_uploaded_file


# This route is PUBLIC
@admin.route('/observation', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listObservation():
    observation = Observation.query.all()
    return json_response(data=(row2dict(x) for x in observation))


@admin.route('/observation/<int:id>/uploadImage', methods=['POST'])
@jwt_required()
def upload_observation_image(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'observation', id, filename)

    return {"Observation image has been uploaded"}


@admin.route('/observation', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def addObservation():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()

    observation = Observation(
        timestamp=data['timestamp'],
        value=data['value'],
        created_by=data['created_by'],
        status=data['status'],
        comment=data['comment'],
        unit_id=data['unit_id'],
        response_variable_id=data['response_variable_id']
    )

    db.session.add(observation)
    return_status = 200
    message = "New observation has been registered"

    try:
        db.session.commit()
        audit_create("observation", observation.id, current_user.id)
        return {"message": message, "id": observation.id}

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/observation/multiple', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def addMultipleObservations():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    multiple_data = request.get_json()

    for data in multiple_data:
        observation = Observation(
            timestamp=data['timestamp'],
            value=data['value'],
            created_by=data['created_by'],
            status=data['status'],
            comment=data['comment'],
            unit_id=data['unit_id'],
            response_variable_id=data['response_variable_id']
        )

        db.session.add(observation)
        db.session.commit()
        return_status = 200

        try:
            # db.session.commit()
            audit_create("observation", observation.id, current_user.id)
            # return {"message": message, "id": observation.id}
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

    message = "Multiple Observations have been registered"

    return {"message": message}


@admin.route('/observation/<int:observation_id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def updateObservationStatus(observation_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, observation_id)
    observation_status_to_update = Observation.query.get_or_404(observation_id)
    new_data = request.get_json()

    observation_status_to_update.status = new_data['status']

    audit_details = prepare_audit_details(inspect(Observation), observation_status_to_update, delete=False)

    message = "Observation status has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("observation", observation_status_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/observation/update/<int:observation_id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def updateObservation(observation_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, observation_id)
    observation_to_update = Observation.query.get_or_404(observation_id)
    new_data = request.get_json()

    observation_to_update.value = new_data['value']
    observation_to_update.comment = new_data['comment']

    audit_details = prepare_audit_details(inspect(Observation), observation_to_update, delete=False)

    message = "Observation has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("observation", observation_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/observation/byuser/<int:user_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def getObservationbyuser(user_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, user_id)
    observations = Observation.query.filter(Observation.created_by == user_id)
    output = []

    for observation in observations:
        observation_data = {}
        observation_data['id'] = observation.id
        observation_data['value'] = observation.value
        observation_data['timestamp'] = observation.timestamp
        observation_data['created_by'] = observation.created_by
        observation_data['status'] = observation.status
        observation_data['comment'] = observation.comment
        observation_data['unit_id'] = observation.unit_id
        observation_data['response_variable_id'] = observation.response_variable_id
        output.append(observation_data)

    return jsonify({'users': output})


@admin.route('/observation/delete/<int:observation_id>', methods=['DELETE'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def deleteObservation(observation_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, observation_id)
    observation_to_delete = Observation.query.filter_by(id=observation_id).first()
    if not observation_to_delete:
        return jsonify({"message": "No observation found!"})

    audit_details = prepare_audit_details(inspect(Observation), observation_to_delete, delete=True)
    db.session.delete(observation_to_delete)
    return_status = 200
    message = "The observation has been deleted"

    try:
        db.session.commit()
        audit_delete("observation", observation_to_delete.id, audit_details, current_user.id)
        return jsonify({"message": message})

    except Exception as e:
        db.session.rollback()
        abort(409)
