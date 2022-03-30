from flask import abort
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.admin import admin
from app.admin.views.level import create_level
from app.models import Variable
from app import db
from app.utils.auditing import audit_create
from app.utils.functions import row2dict, jwt_user


@admin.route('/variable', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listVariable():
    variable = Variable.query.all()
    return json_response(data=(row2dict(x) for x in variable))


@jwt_required()
def create_variable(variable_dict):
    current_user = jwt_user(get_jwt_identity())

    variable = Variable(
        name = variable_dict["name"],
        status = 'active',
        is_sensor_quantity = variable_dict["is_sensor_quantity"],
        procedure = variable_dict["procedure"],
        quantity_id = variable_dict["quantity_id"]
    )

    db.session.add(variable)
    try:
        db.session.commit()
        audit_create("variable", variable.id, current_user.id)

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)

    if "levels" in variable_dict.keys():
        for l in variable_dict["levels"]:
            create_level(variable, l)

    return variable
