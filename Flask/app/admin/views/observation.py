from flask import abort, request, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.admin import admin
from app.models import Observation
from app import db
from app.utils.auditing import audit_create
from app.utils.functions import row2dict, jwt_user
from app.utils.images import image_processing
from app.utils.uploads import get_uploaded_file


@admin.route('/observation', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listObservation():
    observation = Observation.query.all()
    return json_response(data=(row2dict(x) for x in observation))


@admin.route('/observation/<int:id>/uploadImage', methods=['POST'])
def upload_observation_image(id):
    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'observation', id, filename)

    return {"Observation image has been uploaded"}


@admin.route('/observation', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def addObservation():
    current_user = jwt_user(get_jwt_identity())
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




@admin.route('/observation/byuser/<int:user_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def getObservationbyuser(user_id):

    observations = Observation.query.filter(Observation.created_by == user_id)
    output = []

    for observation in observations:
        observation_data = {}
        observation_data['id'] = observation.id
        observation_data['timestamp'] = observation.timestamp
        observation_data['created_by'] = observation.created_by
        observation_data['status'] = observation.status
        observation_data['comment'] = observation.comment
        observation_data['unit_id'] = observation.unit_id
        observation_data['response_variable_id'] = observation.response_variable_id
        output.append(observation_data)

    return jsonify({'users': output})





# BELOW NOT READY YET

# @admin.route('/observation/multiple', methods=['POST'])
# @cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
# @jwt_required()
# def addmultipleObservation():
#
#     #needs a for loop
#
#
#     current_user = jwt_user(get_jwt_identity())
#
#
#     data = request.get_json()
#
#     observation = Observation(
#         timestamp=data['timestamp'],
#         value=data['value'],
#         created_by=data['created_by'],
#         status=data['status'],
#         comment=data['comment'],
#         unit_id=data['unit_id'],
#         response_variable_id=data['response_variable_id']
#     )
#
#     db.session.add(observation)
#     return_status = 200
#     message = "New observation has been registered"
#
#     try:
#         db.session.commit()
#         audit_create("observation", observation.id, current_user.id)
#         return {"message": message, "id": observation.id}
#
#     except Exception as e:
#         db.session.rollback()
#         abort(409, e.orig.msg)

