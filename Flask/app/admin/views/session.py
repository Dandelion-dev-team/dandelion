from flask import abort
from flask_json import json_response
from app.admin import admin
from app.models import Session
from app import db
from app.utils.functions import row2dict


@admin.route('/session', methods=['GET'])
def listSession():
    session = Session.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in session))
