from flask import abort, request
from flask_cors import cross_origin
from flask_json import json_response

from app.admin import admin
from app.models import Observation
from app import db
from app.utils.functions import row2dict
from app.utils.images import image_processing
from app.utils.uploads import get_uploaded_file


@admin.route('/observation', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listObservation ():
    observation = Observation.query.all()
    return json_response(data=(row2dict(x) for x in observation))


@admin.route('/observation/<int:id>/uploadImage', methods=['POST'])
def upload_observation_image(id):

    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'observation', id, filename)

    return {"Observation image has been uploaded"}
