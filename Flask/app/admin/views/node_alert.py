from datetime import datetime

from flask import abort, jsonify, request
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import DATETIME

from app.admin import admin
from app.models import Node_alert
from app import db
from app.utils.authorisation import check_authorisation, auth_check
from app.utils.functions import row2dict, jwt_user


@admin.route('/node_alert', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listNode_alert():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    node_alert = Node_alert.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in node_alert))


@admin.route('/node_alert/active_alerts', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listActiveNode_alerts():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    node_alerts = Node_alert.query.all()

    output = []
    for alerts in node_alerts:
        node_alerts_data = {}
        node_alerts_data['id'] = alerts.id
        node_alerts_data['description'] = alerts.description
        node_alerts_data['created_date'] = alerts.created_date
        node_alerts_data['updated_date'] = alerts.updated_date
        node_alerts_data['status'] = alerts.status
        if alerts.status == 'active':
            output.append(node_alerts_data)

    return jsonify({'node_alerts with status ACTIVE': output})


@admin.route('/node_alert/<int:node_alert_id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def update_node_alert_status(node_alert_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    node_alert_to_update = Node_alert.query.get_or_404(node_alert_id)
    new_node_alert_data = request.get_json()

    node_alert_to_update.status = new_node_alert_data['status']
    new_status = node_alert_to_update.status

    if new_status == "cleared":
        message = "Node alert status has been set to 'cleared'"
        node_alert_to_update.updated_date = datetime.now()
        db.session.commit()
        return {"message": message}
    else:
        message = "Node alert status has not been updated, please insert correct Status Value"

    return jsonify({message})

