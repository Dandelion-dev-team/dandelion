from flask import abort, request, jsonify, current_app
from flask_json import json_response
from werkzeug.utils import secure_filename

from app.admin import admin
from app.models import Experiment, Img
from app import db
from app.utils.functions import row2dict
from app.utils.images import image_processing, allowed_file


@admin.route('/experiment', methods=['GET'])
def listExperiment():
    experiment = Experiment.query.all()
    return json_response(data=(row2dict(x) for x in experiment))


@admin.route('/experiment/<int:id>/uploadImage', methods=['POST'])
def upload_experiment_image(id):
    dummy = request

    id = id
    id = str(id)
    pic = request.files['pic']

    if not pic:
        return jsonify({"No pic uploaded"}), 400

    # Saves image name and image type on db table "img"
    filename = secure_filename(pic.filename)
    mimetype = pic.mimetype

    img = Img(mimetype=mimetype, name=filename)

    db.session.add(img)
    db.session.commit()

    # check if the post request has the file part
    if 'pic' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        return resp

    pic = request.files['pic']

    if pic.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp

    if pic and allowed_file(pic.filename):

        # Image processing part (resize, rename, cropping, directory creation)
        filename = secure_filename(pic.filename)
        folder_location = current_app.config['IMAGE_UPLOADS_EXPERIMENT']
        image_processing(pic, id, filename, folder_location)

    else:
        resp = jsonify({'message': 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
        resp.status_code = 400
        return resp

    return jsonify({"Experiment images has been uploaded"}), 200




# @admin.route('/experiment/add', methods=['GET', 'POST'])
# def add_experiment():
#     form = ExperimentForm()
#     if form.validate_on_submit():
#         experiment = Experiment(name=form.name.data)
#         try:
#             db.session.add(experiment)
#             db.session.commit()
#         except Exception as e:
#             db.session.rollback()
#             abort(409, e.orig.msg)
#
#         return redirect(url_for('admin.list_experiment'))
#
#     return render_template('admin/experiment.html',
#                            form=form,
#                            title="Add experiment")
