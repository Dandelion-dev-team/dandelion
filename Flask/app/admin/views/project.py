import os

from flask import abort, request, jsonify
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from jwt import ExpiredSignatureError
from sqlalchemy import inspect, or_, and_
from dateutil import parser

from app.admin import admin
from app.models import Project, ProjectPartner
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.authorisation import auth_check
from app.utils.error_messages import abort_db
from app.utils.functions import row2dict, jwt_user
from app.utils.images import image_processing
from app.utils.uploads import get_uploaded_file, content_folder


# This route is PUBLIC
@admin.route('/project', methods=['GET'])
def listProject():
    logged_in = False

    try:
        verify_jwt_in_request(optional=True)
        logged_in = True
    except ExpiredSignatureError:
        pass

    if logged_in:
        current_user = jwt_user(get_jwt_identity())
        project = Project. \
            query. \
            join (ProjectPartner). \
            filter(or_(
                ProjectPartner.school_id == current_user.school_id,
                and_(
                    ProjectPartner.status == 'active',
                    ProjectPartner.is_lead_partner == True
                )
            )). \
            all()
    else:
        project = Project. \
            query. \
            filter(Project.status == 'active'). \
            all()

    return json_response(data=(row2dict(x, summary=True) for x in project))


@admin.route('/project/all', methods=['GET'])
def allProjects():
    project = Project.query.filter(Project.status == 'active').all()
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
        abort_db(e)

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
        abort_db(e)


# This route is PUBLIC
@admin.route('/project/blank', methods=['GET'])
def get_blank_project():
    project = Project()

    project_data = row2dict(project)
    project_data['image_full'] = os.path.join(content_folder('project', 0, 'image'), 'full.png')
    project_data['image_thumb'] = os.path.join(content_folder('project', 0, 'image'), 'thumb.png')

    return {'project': project_data}


# This route is PUBLIC
@admin.route('/project/<int:id>', methods=['GET'])
def get_one_project(id):
    project = Project.query.get_or_404(id)
    owner = [p.school for p in project.project_partners if p.is_lead_partner][0]
    project_partner = None
    if verify_jwt_in_request(optional=True):
        current_user = jwt_user(get_jwt_identity())
        project_partner = ProjectPartner.\
            query.\
            filter(ProjectPartner.project_id == id).\
            filter(ProjectPartner.school_id == current_user.school_id).\
            first()

    project_data = row2dict(project)
    project_data['image_full'] = os.path.join(content_folder('project', id, 'image'), 'full.png')
    project_data['image_thumb'] = os.path.join(content_folder('project', id, 'image'), 'thumb.png')
    project_data['owner'] = owner.name
    project_data['owner_id'] = owner.id
    if project_partner:
        project_data['project_partner_id'] = project_partner.id
        project_data['project_partner_status'] = project_partner.status
    else:
        project_data['project_partner_id'] = None
        project_data['project_partner_status'] = None

    # project_data = {}
    # project_data['project_id'] = project.id
    # project_data['title'] = project.title
    # project_data['description'] = project.description
    # project_data['image_full'] = os.path.join(content_folder('project', id, 'image'), 'full.png')
    # project_data['image_thumb'] = os.path.join(content_folder('project', id, 'image'), 'thumb.png')
    # project_data['project_text'] = project.project_text
    # project_data['start_date'] = project.start_date
    # project_data['end_date'] = project.end_date
    # project_data['status'] = project.status

    return {'project': project_data}


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
            abort_db(e)


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
        abort_db(e)


@admin.route('/project/<int:id>/uploadImage', methods=['PUT', 'POST'])
@jwt_required()
def upload_project_image(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'project', id, filename)

    return {"message": "Project image has been uploaded"}


# This route is PUBLIC
@admin.route('/project/byschool/<int:school_id>', methods=['GET'])
def get_project_by_partner(school_id):
    # ToDo: check that only active projects are visible to public users
    projects = Project.\
        query.\
        join(ProjectPartner).\
        filter(ProjectPartner.school_id == school_id).\
        all()

    output = []

    for project in projects:
        owner = [p.school for p in project.project_partners if p.is_lead_partner][0]
        project_partner = ProjectPartner.\
            query.\
            filter(and_(ProjectPartner.project_id == project.id),
                   ProjectPartner.school_id == school_id).\
            first()
        project_data = row2dict(project, summary=True)
        project_data['image_full'] = os.path.join(content_folder('project', 0, 'image'), 'full.png')
        project_data['image_thumb'] = os.path.join(content_folder('project', 0, 'image'), 'thumb.png')
        project_data['owner'] = owner.name
        project_data['owner_id'] = owner.id
        project_data['project_partner_id'] = project_partner.id
        project_data['project_partner_status'] = project_partner.status
        output.append(project_data)

    return jsonify(output)


# This route is PUBLIC
@admin.route('/project/byschoollist/<int_list:school_ids>', methods=['GET'])
def get_project_by_partners(school_ids):
    projects = Project.\
        query.\
        filter(Project.status == 'active').\
        join(ProjectPartner).\
        filter(ProjectPartner.school_id.in_(school_ids)).\
        distinct().\
        all()

    output = []

    for project in projects:
        owner = [p.school for p in project.project_partners if p.is_lead_partner][0]
        project_data = row2dict(project, summary=True)
        project_data['image_full'] = os.path.join(content_folder('project', 0, 'image'), 'full.png')
        project_data['image_thumb'] = os.path.join(content_folder('project', 0, 'image'), 'thumb.png')
        project_data['owner'] = owner.name
        project_data['owner_id'] = owner.id
        project_data['project_partners'] = [row2dict(pp) for pp in project.project_partners]
        output.append(project_data)

    return jsonify({'data': output})
