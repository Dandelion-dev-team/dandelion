from flask import render_template, url_for, redirect, abort, request, jsonify
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import Tag_reference
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user


@admin.route('/tagreference', methods=['GET'])
@jwt_required()
def listTagReference():
    tag_reference = Tag_reference.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in tag_reference))


@admin.route('/tagreference', methods=['POST'])
@jwt_required()
def add_tag_reference():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    tag_reference = Tag_reference(
        label = data['label'],
        status = data['status']
    )

    db.session.add(tag_reference)
    return_status = 200
    message = "New Tag Reference has been registered"

    try:
        db.session.commit()
        audit_create("tag_reference", tag_reference.id, current_user.id)
        return jsonify({"message": message, "id": tag_reference.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/tagreference/<int:id>', methods=['GET'])
@jwt_required()
def getOneTag_Reference(id):
    tag_reference = Tag_reference.query.get_or_404(id)

    tag_reference_data = {}
    tag_reference_data['label'] = tag_reference.label
    tag_reference_data['status'] = tag_reference.status

    return jsonify({'Tag Reference': tag_reference_data})

@admin.route('/tagreference/<int:id>', methods=['PUT'])
@jwt_required()
def updateTag_Reference(id):
    current_user = jwt_user(get_jwt_identity())
    tag_reference_to_update = Tag_reference.query.get_or_404(id)
    new_data = request.get_json()

    tag_reference_to_update.label = new_data["label"]
    tag_reference_to_update.status = new_data["status"]

    audit_details = prepare_audit_details(inspect(Tag_reference), tag_reference_to_update, delete=False)

    message = "Tag reference has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("school", tag_reference_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)

@admin.route('/tagreference/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_tag_reference(id):
    current_user = jwt_user(get_jwt_identity())
    tag_reference_to_delete = Tag_reference.query.filter_by(id=id).first()
    if not tag_reference_to_delete:
        return jsonify({"message": "No Tag Reference found"})

    audit_details = prepare_audit_details(inspect(Tag_reference), tag_reference_to_delete, delete=True)
    db.session.delete(tag_reference_to_delete)
    return_status = 200
    message = "The Tag Reference has been deleted"

    try:
        db.session.commit()
        audit_delete("school", tag_reference_to_delete.id, audit_details, current_user.id)
        return jsonify({"message": message, "id": tag_reference_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)