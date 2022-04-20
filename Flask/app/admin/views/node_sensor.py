
from flask import url_for, redirect, abort, request
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import get_jwt_identity

from app.admin import admin
from app.models import Node_sensor
from app import db
from app.utils.authorisation import check_authorisation, auth_check
from app.utils.functions import row2dict, jwt_user


@admin.route('/node_sensor', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listNode_sensor():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    node_sensor = Node_sensor.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in node_sensor))


