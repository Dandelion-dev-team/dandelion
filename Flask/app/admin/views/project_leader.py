from flask import abort, request, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import ProjectLeader, project_leader
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user


@admin.route('/project_leader', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listProjectLeader():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    project_leader = Project_leader.query.all()

    return json_response(data=(row2dict(x, summary=False) for x in project_leader))


@admin.route('/project_leader', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_project_leader():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    project_leader = ProjectLeader(
        project_id = data['project_id'],
        status = data['status'],
        user_id = data['user_id']
    )

    db.session.add(project_leader)
    return_status = 200
    message = "New project_leader has been registered"

    try:
        db.session.commit()
        audit_create("project_partner", project_leader.id, current_user.id)
        return jsonify({"message": message, "id": project_leader.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/project_leader/<int:id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_one_project_leader(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    project_leader = Project_leader.query.get_or_404(id)


    project_leader_data = {}
    project_leader_data['project_leader_id'] = project_leader.id
    project_leader_data['project_id'] = project_leader.project_id
    project_leader_data['status'] = project_leader.status
    project_leader_data['user_id'] = project_leader.user_id

    return jsonify({'Project': project_leader_data})


@admin.route('/project_leader/<int:id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def update_project_leader(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    project_leader_to_update = Project_leader.query.get_or_404(id)

    new_data = request.get_json()

    project_leader_to_update.project_id = new_data['project_id']
    project_leader_to_update.status = new_data['status']
    project_leader_to_update.user_id = new_data['user_id']

    audit_details = prepare_audit_details(inspect(ProjectLeader), project_leader_to_update, delete=False)

    message = "Project partner has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("authority", project_leader_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/project_leader/<int:id>', methods=['DELETE'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def delete_project_leader(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    project_leader_to_delete = Project_leader.query.filter_by(id=id).first()

    if not project_leader_to_delete:
        return jsonify({"message" : "No Project found"})

    audit_details = prepare_audit_details(inspect(ProjectLeader), project_leader_to_delete, delete = True)
    db.session.delete(project_leader_to_delete)
    return_status = 200
    message = "The Project has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", project_leader_to_delete.id, audit_details, current_user.id)
        return jsonify({"message" : message, "id": project_leader_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)
