from flask import abort
from flask_json import json_response
from app.admin import admin
from app.models import Response
from app import db
from app.utils.functions import row2dict


@admin.route('/response', methods=['GET'])
def listResponse():
    response = Response.query.all()
    return json_response(data=(row2dict(x) for x in response))

