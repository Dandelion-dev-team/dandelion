from flask import abort
from flask_cors import cross_origin
from flask_json import json_response
from app.admin import admin
from app.models import ExperimentParticipant
from app import db
from app.utils.functions import row2dict


@admin.route('/experiment_participant', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listExperiment_participant():
    experiment_participant = ExperimentParticipant.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in experiment_participant))
