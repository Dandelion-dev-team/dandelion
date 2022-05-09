from flask import abort, request
from flask_json import json_response
from flask_jwt_extended import get_jwt_identity

from app.admin import admin
from app.models import Hypothesis
from app import db
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user


# This route is PUBLIC
@admin.route('/hypothesis', methods=['GET'])
def listHypothesis():
    hypothesis = Hypothesis.query.all()
    return json_response(data=(row2dict(x) for x in hypothesis))

