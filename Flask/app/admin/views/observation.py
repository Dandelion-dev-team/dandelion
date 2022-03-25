from flask import abort, request, jsonify, current_app
from flask_json import json_response
from werkzeug.utils import secure_filename

from app.admin import admin
from app.models import Observation, Img
from app import db
from app.utils.functions import row2dict
from app.utils.images import allowed_file, image_processing


@admin.route('/observation', methods=['GET'])
def listObservation ():
    observation = Observation .query.all()
    return json_response(data=(row2dict(x) for x in observation))


@admin.route('/observation/<int:id>/uploadImage', methods=['POST'])
def upload_observation_image(id):

    id = id
    id = str(id)
    pic = request.files['pic']

    # check if the post request has the file part
    if 'pic' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        return resp

    if pic.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp

    if pic and allowed_file(pic.filename):

        # Image processing part (resize, rename, cropping, directory creation)
        filename = secure_filename(pic.filename)
        folder_location = current_app.config['IMAGE_UPLOADS_OBSERVATION']
        image_processing(pic, id, filename, folder_location)

    else:
        resp = jsonify({'message': 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
        resp.status_code = 400
        return resp

    return jsonify({"Observation images has been uploaded"}), 200