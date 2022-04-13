from flask import abort, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required

from app.admin import admin
from app.models import Node_alert
from app import db
from app.utils.functions import row2dict


@admin.route('/node_alert', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listNode_alert():
    node_alert = Node_alert.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in node_alert))


@admin.route('/node_alert/active_alerts', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listActiveNode_alerts():
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
