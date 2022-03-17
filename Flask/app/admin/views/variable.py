from flask import abort
from flask_cors import cross_origin
from flask_json import json_response
from app.admin import admin
from app.models import Variable
from app import db
from app.utils.functions import row2dict


@admin.route('/variable', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listVariable():
    variable = Variable.query.all()
    return json_response(data=(row2dict(x) for x in variable))


