from flask import render_template, url_for, redirect, abort, request, jsonify
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.models import Node
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete
from app.utils.functions import row2dict, jwt_user


@admin.route('/node', methods=['GET'])
@jwt_required()
def listNode():
    node = Node.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in node))


@admin.route('/node', methods=['POST'])
@jwt_required()
def add_node():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    node = Node(
        school_id = data['school_id'],
        growcube_code = data['growcube_code'],
        mac_address = data['mac_address'],
        last_communication_date = data['last_communication_date'],
        next_communication_date = data['next_communication_date'],
        health_status = data['health_status'],
        status = data['status']

    )

    db.session.add(node)
    return_status = 200
    message = "New node has been registered"

    try:
        db.session.commit()
        audit_create("node", node.id, current_user.id)
        return jsonify({"message": message, "id": node.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/node/<int:id>', methods=['GET'])
@jwt_required()
def get_one_node(id):
    node = Node.query.get_or_404(id)

    node_data = {}
    node_data['node_id'] = node.id
    node_data['school_id'] = node.school_id
    node_data['growcube_code'] = node.growcube_code
    node_data['mac_address'] = node.mac_address
    node_data['last_communication_date'] = node.last_communication_date
    node_data['next_communication_date'] = node.next_communication_date
    node_data['health_status'] = node.health_status
    node_data['status'] = node.status


    return jsonify({'Node': node_data})


@admin.route('/node/<int:id>', methods=['PUT'])
@jwt_required()
def updateNode(id):
    current_user = jwt_user(get_jwt_identity())
    node_to_update = Node.query.get_or_404(id)
    new_data = request.get_json()

    node_to_update.school_id = new_data["school_id"]
    node_to_update.growcube_code = new_data["growcube_code"]
    node_to_update.mac_address = new_data["mac_address"]
    node_to_update.last_communication_date = new_data["last_communication_date"]
    node_to_update.next_communication_date = new_data["next_communication_date"]
    node_to_update.health_status = new_data["health_status"]
    node_to_update.status = new_data["status"]


    audit_details = prepare_audit_details(inspect(Node), node_to_update, delete=False)

    message = "Node has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("authority", node_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/node/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_node(id):
    current_user = jwt_user(get_jwt_identity())
    node_to_delete = Node.query.filter_by(id=id).first()
    if not node_to_delete:
        return jsonify({"message" : "No Node found"})

    audit_details = prepare_audit_details(inspect(Node), node_to_delete, delete = True)
    db.session.delete(node_to_delete)
    return_status = 200
    message = "The Node has been deleted"

    try:
        db.session.commit()
        audit_delete("authority", node_to_delete.id, audit_details, current_user.id)
        return jsonify({"message" : message, "id": node_to_delete.id})

    except Exception as e:
        db.session.rollback()
        abort(409,e.orig.msg)