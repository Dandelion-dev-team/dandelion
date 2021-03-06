
from flask import url_for, redirect, abort, request
from flask_json import json_response
from flask_jwt_extended import get_jwt_identity

from app.admin import admin
from app.models import NodeSensor
from app import db
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user


@admin.route('/node_sensor', methods=['GET'])
def listNode_sensor():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    node_sensor = NodeSensor.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in node_sensor))


