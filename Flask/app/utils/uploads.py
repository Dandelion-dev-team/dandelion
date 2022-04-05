import os
from flask import abort, current_app
from werkzeug.utils import secure_filename
from instance.config import ALLOWED_EXTENSIONS


def content_folder(object_type, id, content_type, upload=False):
    tail = os.path.join(content_type, object_type, str(id))

    if upload:
        base_dir = os.path.join(current_app.config['CONTENT_ROOT_UPLOAD'], tail)
        if not os.path.exists(base_dir):
            os.makedirs(base_dir)
        return base_dir
    else:
        if os.path.exists(os.path.join(current_app.config['CONTENT_ROOT_UPLOAD'], tail)):
            return os.path.join(current_app.config['CONTENT_ROOT_DOWNLOAD'], tail)
        else:
            return os.path.join(current_app.config['CONTENT_ROOT_DOWNLOAD'], content_type, object_type, '0')


def get_uploaded_file(request):

    # check if the post request has the file part
    if 'file' not in request.files:
        abort(400, 'No file part in the request')

    pic = request.files['file']

    if pic.filename == '':
        abort(400, 'No file selected for uploading')

    if not allowed_file(pic.filename):
        abort(400, 'Allowed file types are txt, pdf, png, jpg, jpeg, gif')

    filename = secure_filename(pic.filename)

    return pic, filename


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
