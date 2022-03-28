from flask import abort, request, jsonify, current_app
from flask_json import json_response
from werkzeug.utils import secure_filename
from app.admin import admin
from app.models import Experiment, Img
from app import db
from app.utils.functions import row2dict
from app.utils.images import allowed_file, image_processing, image_processing_2, image_root


@admin.route('/experiment', methods=['GET'])
def listExperiment():
    experiment = Experiment.query.all()
    return json_response(data=(row2dict(x) for x in experiment))


@admin.route('/experiment/<int:id>', methods=['GET'])
# @jwt_required()
def getOneExperiment(id):
    experiment = Experiment.query.get_or_404(id)
    id = id
    id = str(id)

    experiment_data = {}
    experiment_data['experiment_id'] = experiment.id
    experiment_data['project_id'] = experiment.project_id
    experiment_data['project_partner_id'] = experiment.project_partner_id
    experiment_data['is_synchronised'] = experiment.is_synchronised
    experiment_data['title'] = experiment.title
    experiment_data['description'] = experiment.description
    experiment_data['experiment_image_link'] = experiment.experiment_image_link
    experiment_data['experiment_text'] = experiment.experiment_text
    experiment_data['start_date'] = experiment.start_date
    experiment_data['end_date'] = experiment.end_date
    experiment_data['status'] = experiment.status

    full = True
    folder_location = current_app.config['IMAGE_UPLOADS_EXPERIMENT']
    root_full = image_root(folder_location, id, full)
    full = False
    root_thumb = image_root(folder_location, id, full)

    return jsonify({'experiment': experiment_data, 'image_root_full': root_full, 'image_root_thumb': root_thumb})


@admin.route('/experiment/<int:id>/uploadImage', methods=['POST'])
def upload_experiment_image(id):
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
        folder_location = current_app.config['IMAGE_UPLOADS_EXPERIMENT']
        image_processing_2(pic, id, filename,
                           folder_location)  # image_processing_2 is a draft code, when ready I will rename it to image_processing and update the images.py code

    else:
        resp = jsonify({'message': 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
        resp.status_code = 400
        return resp

    return jsonify({"Experiment images has been uploaded"}), 200
