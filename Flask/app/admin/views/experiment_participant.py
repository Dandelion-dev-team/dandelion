from flask import abort, request, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy import inspect
from sqlalchemy.sql.functions import user
import os

from app.utils.authorisation import auth_check
from app.utils.uploads import get_uploaded_file, content_folder

from app.admin import admin
from app.models import ExperimentParticipant
from app.models import Experiment
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_delete, audit_update
from app.utils.functions import row2dict, jwt_user


@admin.route('/experiment_participant', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listExperiment_participant():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    experiment_participant = ExperimentParticipant.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in experiment_participant))


@admin.route('/experiment_participant/add', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def addExperiment_participant():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()

    experiment_participant = ExperimentParticipant(
        user_id=data['user_id'],
        experiment_id=data['experiment_id'],
        status=data['status'],
    )

    db.session.add(experiment_participant)
    return_status = 200
    message = "New experiment participant has been registered"

    try:
        db.session.commit()
        audit_create("experiment_participant", experiment_participant.id, current_user.id)
        return {"message": message, "id": experiment_participant.id}

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/experiment_participant/<int:user_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def experiments_by_participant(user_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, user_id)
    participating = ExperimentParticipant.query.filter(ExperimentParticipant.user_id == user_id).all()

    output = []
    for user in participating:
        experiment = Experiment.query.get_or_404(user.experiment_id)
        experiment_data = {}
        experiment_data['experiment_id'] = experiment.id
        experiment_data['project_id'] = experiment.project_id
        experiment_data['title'] = experiment.title
        experiment_data['image_thumb'] = os.path.join(content_folder('project', id, 'image'), 'thumb.png')

        output.append(experiment_data)

    return jsonify({'data': output})


@admin.route('/experiment_participant/<int:experiment_id>/<int:user_id>', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_new_experiment_participant(experiment_id, user_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, experiment_id, user_id)
    data = request.get_json()
    participant = ExperimentParticipant(
        user_id=user_id,
        experiment_id=experiment_id,
        status=data['status'],
    )
    db.session.add(participant)
    return_status = 200
    message = "New experiment participant has been registered"

    try:
        db.session.commit()
        audit_create("experiment_participant", participant.id, current_user.id)
        return jsonify({"message": message, "participant's id": participant.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/experiment_participant/updatestatus/<int:experiment_participant_id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def updateExperimentParticipantStatus(experiment_participant_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, experiment_participant_id)
    experiment_participant_to_update = ExperimentParticipant.query.get_or_404(experiment_participant_id)
    new_data = request.get_json()

    experiment_participant_to_update.status = new_data['status']

    audit_details = prepare_audit_details(inspect(ExperimentParticipant), experiment_participant_to_update,
                                          delete=False)

    message = "Experiment participant status has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("experiment_participant", experiment_participant_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/experiment_participant/delete/<int:experiment_participant_id>', methods=['DELETE'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def deleteΕxperimentPaticipant(experiment_participant_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, experiment_participant_id)
    experiment_participant_to_delete = ExperimentParticipant.query.filter_by(id=experiment_participant_id).first()
    if not experiment_participant_to_delete:
        return jsonify({"message": "No experiment participant found!"})

    audit_details = prepare_audit_details(inspect(ExperimentParticipant), experiment_participant_to_delete, delete=True)
    db.session.delete(experiment_participant_to_delete)
    return_status = 200
    message = "The Experiment Participant has been deleted"

    try:
        db.session.commit()
        audit_delete("experiment_participant", experiment_participant_to_delete.id, audit_details, current_user.id)
        return jsonify({"message": message})

    except Exception as e:
        db.session.rollback()
        abort(409)
