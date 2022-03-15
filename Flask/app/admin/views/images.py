import os
from flask import request, jsonify, abort, render_template, url_for
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect
from werkzeug.utils import secure_filename, redirect
from app.admin import admin
from app.models import Authority
from app import db
from app.utils.functions import row2dict, jwt_user
from PIL import Image
# from app.utils.images import allowed_file
from flask import render_template, request, flash, redirect

import os
import secrets




# @admin.route('/upload', methods=['GET', 'POST'])
# def upload_file():
#     if request.method == 'POST':
#         file = request.files['file']
#         # filename = secure_filename(file.filename)
#         file.save(os.path.join("original", file.filename))
#     return jsonify({"message"})


@admin.route("/upload", methods=["GET", "POST"])
def upload_image():
    dummy = request

    if request.method == "POST":

        if request.files:

            image = request.files["image"]

            image.save(os.path.join(admin.config["IMAGE_UPLOADS"], image.filename))

            print("Image saved")

            return redirect(request.url)

    message = "success"
    return jsonify({"message": message})




# @admin.route('/upload', methods=['GET', 'POST'])
# def upload():
#     if request.method == 'POST':
#         for upload in request.files.getlist('images'):
#             filename = upload.filename
#
#             # Always a good idea to secure a filename before storing it
#             filename = secure_filename(filename)
#
#             # This is to verify files are supported
#             ext = os.path.splitext(filename)[1][1:].strip().lower()
#             if ext in {'jpg', 'jpeg', 'png'}:
#                 print('File supported moving on...')
#             else:
#                 message = "Uploaded files are not supported..."
#                 return jsonify({"message": message})
#             destination = 'app\static\images\original'.join([images_directory, filename])
#
#             # Save original image
#             upload.save(destination)
#
#             # Save a copy of the thumbnail image
#             image = Image.open(destination)
#             image.thumbnail((300, 170))
#             image.save('app\static\images\original\thumbnail'.join([thumbnails_directory, filename]))
#         return jsonify({"end of loop message"})
#     return jsonify({"message"})
