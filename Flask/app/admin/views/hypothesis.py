from flask import abort, request
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import get_jwt_identity

from app.admin import admin
from app.models import Hypothesis
from app import db
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user


@admin.route('/hypothesis', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listHypothesis():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    hypothesis = Hypothesis.query.all()
    return json_response(data=(row2dict(x) for x in hypothesis))

