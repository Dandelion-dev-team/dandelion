import os

from flask import abort, request, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import ProjectPartner, School, project_partner, Project
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user
from app.utils.uploads import get_uploaded_file, content_folder

@admin.route('/project_partner', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listProjectPartner():
    project_partner = ProjectPartner.query.all()
    return json_response(data=(row2dict(x, summary=False) for x in project_partner))


@admin.route('/project_partner', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_project_partner():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    project_partner = ProjectPartner(
        school_id=data['school_id'],
        project_id=data['project_id'],
        is_lead_partner=data['is_lead_partner'],
        status=data['status']
    )

    db.session.add(project_partner)
    return_status = 200
    message = "New project_partner has been registered"

    try:
        db.session.commit()
        audit_create("project_partner", project_partner.id, current_user.id)
        return jsonify({"message": message, "id": project_partner.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/project_partner/<int:project_id>/<int:school_id>', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_project_partner_by_invite(project_id, school_id):
    current_user = jwt_user(get_jwt_identity())
    new_project_partner = ProjectPartner(
        school_id=school_id,
        project_id=project_id,
        status="invited"
    )
    db.session.add(new_project_partner)
    return_status = 200
    message = "Invitation Sent"

    try:
        db.session.commit()
        audit_create("project_partner", new_project_partner.id, current_user.id)
        return jsonify({"message": message, "id": new_project_partner.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/project_partner/<int:school_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def ListAllSchoolInvitations(school_id):
    invited_schools = ProjectPartner.query.\
        join(School).\
        filter(School.id == school_id). \
        with_entities(ProjectPartner.project_id,
                      ProjectPartner.school_id,
                      ProjectPartner.status,
                      School.name)

    output = []
    for schools in invited_schools:
        if schools.status == 'invited':
            invited_data = {}
            invited_data['id'] = schools.project_id
            invited_data['inviting_school_name'] = schools.name
            invited_data['project_title'] = schools.project_id
            output.append(invited_data)

    return jsonify({'Invitations of this school': output})


@admin.route('/project_partner/<int:id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_one_project_partner(id):
    project_partner = ProjectPartner.query.get_or_404(id)

    project_partner_data = {}
    project_partner_data['project_partner_id'] = project_partner.id
    project_partner_data['school_id'] = project_partner.school_id
    project_partner_data['project_id'] = project_partner.project_id
    project_partner_data['is_lead_partner'] = project_partner.is_lead_partner
    project_partner_data['status'] = project_partner.status

    return jsonify({'Project': project_partner_data})


@admin.route('/project_partner/byschool/<int:school_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_project_by_partner(school_id):
    project_partners = ProjectPartner.query.filter(ProjectPartner.school_id == school_id).all()

    output = []

    for project_partner in project_partners:
        project_partner_data = {}
        project = Project.query.get_or_404(project_partner.project_id)
        project_partner_data['project_id'] = project.id
        project_partner_data['title'] = project.title
        project_partner_data['description'] = project.description
        project_partner_data['image_full'] = os.path.join(content_folder('project', id, 'image'), 'full.png')
        project_partner_data['image_thumb'] = os.path.join(content_folder('project', id, 'image'), 'thumb.png')
        project_partner_data['project_text'] = project.project_text
        project_partner_data['start_date'] = project.start_date
        project_partner_data['end_date'] = project.end_date
        project_partner_data['status'] = project.status
        output.append(project_partner_data)

    return jsonify(output)


@admin.route('/project_partner/<int:id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def update_project_partner(id):
    current_user = jwt_user(get_jwt_identity())
    project_partner_to_update = ProjectPartner.query.get_or_404(id)
    new_data = request.get_json()

    project_partner_to_update.school_id = new_data['school_id']
    project_partner_to_update.project_id = new_data['project_id']
    project_partner_to_update.is_lead_partner = new_data['is_lead_partner']
    project_partner_to_update.status = new_data['status']

    audit_details = prepare_audit_details(inspect(ProjectPartner), project_partner_to_update, delete=False)

    message = "Project partner has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("authority", project_partner_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/project_partner/<int:id>', methods=['DELETE'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def delete_project_partner(id):
    current_user = jwt_user(get_jwt_identity())
    project_partner_to_delete = ProjectPartner.query.filter_by(id=id).first()
    if not project_partner_to_delete:
        return jsonify({"message": "No Project found"})

    audit_details = prepare_audit_details(inspect(ProjectPartner), project_partner_to_delete, delete=True)
    db.session.delete(project_partner_to_delete)
    return_status = 200
    message = "The Project has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", project_partner_to_delete.id, audit_details, current_user.id)
        return jsonify({"message": message, "id": project_partner_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)
