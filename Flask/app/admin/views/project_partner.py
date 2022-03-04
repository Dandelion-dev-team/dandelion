from flask import render_template, url_for, redirect, abort, request, jsonify
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import Project_partner
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user


@admin.route('/project_partner', methods=['GET'])
@jwt_required()
def listProjectPartner():
    project_partner = Project_partner.query.all()
    return json_response(data=(row2dict(x, summary=False) for x in project_partner))


@admin.route('/project_partner', methods=['POST'])
@jwt_required()
def add_project_parnter():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()

    # I NEED FOREIGN KEY RELATIONSHIPS
    # project_partner = Project_partner(
    #     school_id = School.query
    #     project_id =
    #     is_leader_partner = data['is_leader_partner'],
    #     status = data['status']
    # )


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


@admin.route('/project_partner/<int:id>', methods=['GET'])
@jwt_required()
def get_one_project_partner(id):
    project_partner = Project_partner.query.get_or_404(id)

    project_partner_data = {}
    project_partner_data['project_partner_id'] = project_partner.id
    project_partner_data['school_id'] = project_partner.school_id
    project_partner_data['project_id'] = project_partner.project_id
    project_partner_data['is_lead_partner'] = project_partner.is_lead_partner
    project_partner_data['status'] = project_partner.status


    return jsonify({'Project': project_partner_data})


@admin.route('/project_partner/<int:id>', methods=['PUT'])
@jwt_required()
def update_project_partner(id):
    current_user = jwt_user(get_jwt_identity())
    project_partner_to_update = Project_partner.query.get_or_404(id)
    new_data = request.get_json()

    project_partner_to_update.school_id = new_data['school_id']
    project_partner_to_update.project_id = new_data['project_id']
    project_partner_to_update.is_leader_partner = new_data['is_leader_partner']
    project_partner_to_update.status = new_data['status']

    audit_details = prepare_audit_details(inspect(Project_partner), project_partner_to_update, delete=False)

    message = "Project partner has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("authority", project_partner_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/project/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_project_partner(id):
    current_user = jwt_user(get_jwt_identity())
    project_partner_to_delete = Project_partner.query.filter_by(id=id).first()
    if not project_partner_to_delete:
        return jsonify({"message" : "No Project found"})

    audit_details = prepare_audit_details(inspect(Project_partner), project_partner_to_delete, delete = True)
    db.session.delete(project_partner_to_delete)
    return_status = 200
    message = "The Project has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", project_partner_to_delete.id, audit_details, current_user.id)
        return jsonify({"message" : message, "id": project_partner_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)
