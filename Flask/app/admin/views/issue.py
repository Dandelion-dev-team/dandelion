from flask import abort, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import get_jwt_identity
from sqlalchemy import inspect
from sqlalchemy.sql.functions import user

from app.admin import admin
from app.models import Issue
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update
from app.utils.functions import jwt_user
from app.utils.images import image_processing
from app.utils.uploads import get_uploaded_file


@admin.route('/issue', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def getAllIssues():
    issues = Issue.query.all()
    output = []

    for issue in issues:
        issue_data = {}
        issue_data['id'] = issue.id
        issue_data['user_id'] = issue.user_id
        issue_data['name'] = issue.name
        issue_data['reported_date'] = issue.reported_date
        issue_data['symptoms'] = issue.symptoms
        issue_data['steps_to_reproduce'] = issue.steps_to_reproduce
        issue_data['notes'] = issue.notes
        issue_data['type'] = issue.type
        issue_data['priority'] = issue.priority
        issue_data['status'] = issue.status
        output.append(issue_data)

    return jsonify({'issues': output})


@admin.route('/issue/<int:issue_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def getOneIssue(issue_id):
    issue = Issue.query.get_or_404(issue_id)

    issue_data = {}
    issue_data['id'] = issue.id
    issue_data['user_id'] = issue.user_id
    issue_data['name'] = issue.name
    issue_data['reported_date'] = issue.reported_date
    issue_data['symptoms'] = issue.symptoms
    issue_data['steps_to_reproduce'] = issue.steps_to_reproduce
    issue_data['notes'] = issue.notes
    issue_data['type'] = issue.type
    issue_data['priority'] = issue.priority
    issue_data['status'] = issue.status

    return jsonify({'isssue': issue_data})


@admin.route('/issue', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def createNewIssue():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    issue = Issue(
        user_id=data['user_id'],
        name=data['name'],
        reported_date=data['reported_date'],
        symptoms=data['symptoms'],
        steps_to_reproduce=data['steps_to_reproduce'],
        notes=data['notes'],
        type=data['type'],
        priority=data['priority'],
        status=data['status'],
    )
    db.session.add(issue)
    return_status = 200
    message = "New issue has been created"

    try:
        db.session.commit()
        audit_create("users", user.id, current_user.id)
        return jsonify({"message": message, "id": user.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/issue/<int:issue_id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def updateIssueDetails(issue_id):
    current_user = jwt_user(get_jwt_identity())
    issue_to_update = Issue.query.get_or_404(issue_id)
    new_data = request.get_json()

    issue_to_update.name = new_data['name']
    issue_to_update.reported_date = new_data['reported_date']
    issue_to_update.symptoms = new_data['symptoms']
    issue_to_update.steps_to_reproduce = new_data['steps_to_reproduce']
    issue_to_update.notes = new_data['notes']
    issue_to_update.type = new_data['type']
    issue_to_update.priority = new_data['priority']
    issue_to_update.status = new_data['status']

    audit_details = prepare_audit_details(inspect(Issue), issue_to_update, delete=False)

    message = "Issue has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("issue", issue_to_update.issue_id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/issue/note/<int:issue_id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def addNote(issue_id):
    current_user = jwt_user(get_jwt_identity())
    issue_to_update = Issue.query.get_or_404(issue_id)
    new_data = request.get_json()

    issue_to_update.notes = new_data['notes']

    audit_details = prepare_audit_details(inspect(Issue), issue_to_update, delete=False)

    message = "Note has been added"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("issue", issue_to_update.issue_id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/issue/close/<int:issue_id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def closeIssue(issue_id):
    current_user = jwt_user(get_jwt_identity())
    issue_to_update = Issue.query.get_or_404(issue_id)
    new_data = request.get_json()

    if new_data == 'closed':
        issue_to_update.status = new_data['status']

        audit_details = prepare_audit_details(inspect(Issue), issue_to_update, delete=False)

        message = "Note has been closed"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("issue", issue_to_update.issue_id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)

@admin.route('/issue/upload_image/<int:issue_id>', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def uploadIssueImage(issue_id):
    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'issue', id, filename)

    return {"message": "Issue image has been uploaded"}
