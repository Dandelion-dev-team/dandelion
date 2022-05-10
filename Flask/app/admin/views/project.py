import os

from flask import abort, request
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect
from dateutil import parser

from app.admin import admin
from app.models import Project, ProjectPartner
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user
from app.utils.images import image_processing
from app.utils.uploads import get_uploaded_file, content_folder


# This route is PUBLIC
@admin.route('/project', methods=['GET'])
def listProject():
    project = Project.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in project))


@admin.route('/project', methods=['POST'])
@jwt_required()
def add_project():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)

    data = request.get_json()
    project = Project(
        title = data['title'],
        description = data['description'],
        project_image_link=data['project_image_link'],
        project_text = data['project_text'],
        start_date = parser.parse(data['start_date']),
        end_date = parser.parse(data['end_date']),
        status = data['status'],
    )

    db.session.add(project)
    message = "New project has been registered"

    try:
        db.session.commit()
        audit_create("project", project.id, current_user.id)

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)

    project_partner = ProjectPartner(
        school_id=current_user.school.id,
        project_id=project.id,
        is_lead_partner=True,
        status='active'
    )

    db.session.add(project_partner)
    try:
        db.session.commit()
        audit_create("project_partner", project_partner.id, current_user.id)
        return {"message": message, "id": project.id}

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


# This route is PUBLIC
@admin.route('/project/<int:id>', methods=['GET'])
def get_one_project(id):
    project = Project.query.get_or_404(id)

    project_data = {}
    project_data['project_id'] = project.id
    project_data['title'] = project.title
    project_data['description'] = project.description
    project_data['image_full'] = os.path.join(content_folder('project', id, 'image'), 'full.png')
    project_data['image_thumb'] = os.path.join(content_folder('project', id, 'image'), 'thumb.png')
    project_data['project_text'] = project.project_text
    project_data['start_date'] = project.start_date
    project_data['end_date'] = project.end_date
    project_data['status'] = project.status

    return {'Project': project_data}

@admin.route('/project/<int:id>', methods=['PUT'])
@jwt_required()
def update_project(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    project_to_update = Project.query.get_or_404(id)
    new_data = request.get_json()

    project_to_update.title = new_data['title']
    project_to_update.description = new_data['description']
    project_to_update.project_text = new_data['project_text']
    project_to_update.project_image_link = new_data['project_image_link']
    project_to_update.start_date = parser.parse(new_data['start_date'])
    project_to_update.end_date = parser.parse(new_data['end_date'])
    project_to_update.status = new_data['status']

    audit_details = prepare_audit_details(inspect(Project), project_to_update, delete=False)

    message = "Project has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("project", project_to_update.id, audit_details, current_user.id)
            return {"message": message}

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/project/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    project_to_delete = Project.query.filter_by(id=id).first()
    if not project_to_delete:
        return {"message": "No Project found"}

    audit_details = prepare_audit_details(inspect(Project), project_to_delete, delete=True)
    db.session.delete(project_to_delete)
    return_status = 200
    message = "The Project has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", project_to_delete.id, audit_details, current_user.id)
        return {"message": message, "id": project_to_delete.id}

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/project/<int:id>/uploadImage', methods=['PUT', 'POST'])
@jwt_required()
def upload_project_image(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'project', id, filename)

    return {"message": "Project image has been uploaded"}
