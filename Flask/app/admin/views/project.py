from flask import abort, jsonify, request
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import Project
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user


@admin.route('/project', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listProject():
    project = Project.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in project))


@admin.route('/project', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
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
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_one_project(id):
    project = Project.query.get_or_404(id)

    project_data = {}
    project_data['project_id'] = project.id
    project_data['title'] = project.title
    project_data['description'] = project.description
    project_data['project_image_link'] = project.project_image_link
    project_data['project_text'] = project.project_text
    project_data['start_date'] = project.start_date
    project_data['end_date'] = project.end_date
    project_data['status'] = project.status

    return jsonify({'Project': project_data})

@admin.route('/project/<int:id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
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
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
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
