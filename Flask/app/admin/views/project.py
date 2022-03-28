from flask import abort, jsonify, request, current_app
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect
from werkzeug.utils import secure_filename

from app.admin import admin
from app.models import Project, Img
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user
from app.utils.images import allowed_file, image_processing, image_root


@admin.route('/project', methods=['GET'])
@jwt_required()
def listProject():
    project = Project.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in project))


@admin.route('/project', methods=['POST'])
@jwt_required()
def add_project():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    project = Project(
        title = data['title'],
        description = data['description'],
        project_image_link = data['project_image_link'],
        project_text = data['project_text'],
        start_date = data['start_date'],
        end_date = data['end_date'],
        status = data['status'],
    )

    db.session.add(project)
    return_status = 200
    message = "New project has been registered"

    try:
        db.session.commit()
        audit_create("project", project.id, current_user.id)
        return jsonify({"message": message, "id": project.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/project/<int:id>', methods=['GET'])
# @jwt_required()
def get_one_project(id):
    project = Project.query.get_or_404(id)
    id = id
    id = str(id)

    project_data = {}
    project_data['project_id'] = project.id
    project_data['title'] = project.title
    project_data['description'] = project.description
    project_data['project_image_link'] = project.project_image_link
    project_data['project_text'] = project.project_text
    project_data['start_date'] = project.start_date
    project_data['end_date'] = project.end_date
    project_data['status'] = project.status

    full = True
    folder_location = current_app.config['IMAGE_UPLOADS_PROJECT']
    root_full = image_root(folder_location, id, full)
    full = False
    root_thumb = image_root(folder_location, id, full)

    return jsonify({'Project': project_data, 'image_root_full' : root_full, 'image_root_thumb' : root_thumb})

@admin.route('/project/<int:id>', methods=['PUT'])
@jwt_required()
def update_project(id):
    current_user = jwt_user(get_jwt_identity())
    project_to_update = Project.query.get_or_404(id)
    new_data = request.get_json()

    project_to_update.title = new_data['title']
    project_to_update.description = new_data['description']
    project_to_update.project_image_link = new_data['project_text']
    project_to_update.start_date = new_data['start_date']
    project_to_update.end_date = new_data['end_date']
    project_to_update.status = new_data['status']

    audit_details = prepare_audit_details(inspect(Project), project_to_update, delete=False)

    message = "Project has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("authority", project_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/project/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project(id):
    current_user = jwt_user(get_jwt_identity())
    project_to_delete = Project.query.filter_by(id=id).first()
    if not project_to_delete:
        return jsonify({"message" : "No Project found"})

    audit_details = prepare_audit_details(inspect(Project), project_to_delete, delete = True)
    db.session.delete(project_to_delete)
    return_status = 200
    message = "The Project has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", project_to_delete.id, audit_details, current_user.id)
        return jsonify({"message" : message, "id": project_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)



@admin.route('/project/<int:id>/uploadImage', methods=['POST'])
def upload_project_image(id):

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
        folder_location = current_app.config['IMAGE_UPLOADS_PROJECT']
        image_processing(pic, id, filename, folder_location)

    else:
        resp = jsonify({'message': 'Allowed file types are txt, pdf, png, jpg, jpeg, gif'})
        resp.status_code = 400
        return resp

    return jsonify({"Project images has been uploaded"}), 200