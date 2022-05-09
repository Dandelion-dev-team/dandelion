from flask import abort
from flask_json import json_response
from app.admin import admin
from app.models import Option
from app import db
from app.utils.functions import row2dict


@admin.route('/option', methods=['GET'])
def listOption():
    option = Option.query.all()
    return json_response(data=(row2dict(x) for x in option))



