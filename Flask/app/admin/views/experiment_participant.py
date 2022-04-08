from flask import abort, request, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy.sql.functions import user
import os
from app.utils.uploads import get_uploaded_file, content_folder

from app.admin import admin
from app.models import ExperimentParticipant
from app.models import Experiment
from app import db
from app.utils.auditing import audit_create
from app.utils.functions import row2dict, jwt_user


@admin.route('/experiment_participant', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listExperiment_participant():
    experiment_participant = ExperimentParticipant.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in experiment_participant))


@admin.route('/experiment_participant/<int:user_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def experiments_by_participant(user_id):
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


@admin.route('/experiment_paticipant/<int:experiment_id>/<int:user_id>', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_new_experiment_participant(experiment_id, user_id):
    current_user = jwt_user(get_jwt_identity())

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
