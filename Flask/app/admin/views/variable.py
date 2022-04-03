from flask import abort, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.admin import admin
from app.admin.views.level import create_level
from app.models import Variable, Response, variable, ResponseVariable
from app import db
from app.utils.auditing import audit_create
from app.utils.functions import row2dict, jwt_user


@admin.route('/allVariables', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listAllVariable():
    response_variable_demo = ResponseVariable.query.all()
    treatment_variable = Variable.query.all()
    output = []
    output2 = []

    for variable in treatment_variable:
        treatment_variable_data = {}
        treatment_variable_data['id'] = variable.id
        treatment_variable_data['name'] = variable.name
        treatment_variable_data['status'] = variable.status
        treatment_variable_data['is_sensor_quantity'] = variable.is_sensor_quantity
        treatment_variable_data['procedure'] = variable.procedure
        treatment_variable_data['quantity_id'] = variable.quantity_id
        output.append(treatment_variable_data)

    for response_variable in response_variable_demo:
        response_variable_data = {}
        response_variable_data['id'] = response_variable.id
        response_variable_data['experiment_id'] = response_variable.experiment_id
        response_variable_data['variable_id'] = response_variable.variable_id
        response_variable_data['monday'] = response_variable.monday
        response_variable_data['tuesday'] = response_variable.tuesday
        response_variable_data['wednesday'] = response_variable.wednesday
        response_variable_data['thursday'] = response_variable.thursday
        response_variable_data['friday'] = response_variable.friday
        response_variable_data['saturday'] = response_variable.saturday
        response_variable_data['sunday'] = response_variable.sunday
        response_variable_data['once'] = response_variable.once
        response_variable_data['final'] = response_variable.final
        output2.append(response_variable_data)

    return jsonify({'Treatment Variables': output}, {'Response Variables': output2})


# json_response(data=(row2dict(x) for x in response_variable))


# @admin.route('/user/byschool/<int:school_id>', methods=['GET'])
# @cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
# @jwt_required()
# def getUsersBySchoolID(school_id):
#     # user = User.query.get_or_404(username)
#     users = User.query.filter(User.school_id == school_id)
#     output = []
#
#     for user in users:
#         user_data = {}
#         user_data['username'] = user.username
#         user_data['status'] = user.status
#         user_data['school_id'] = user.school_id
#         output.append(user_data)
#
#     return jsonify({'users': output})


@admin.route('/variable', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def create_variable(variable_dict):
    current_user = jwt_user(get_jwt_identity())

    variable = Variable(
        name=variable_dict["name"],
        status='active',
        is_sensor_quantity=variable_dict["is_sensor_quantity"],
        procedure=variable_dict["procedure"],
        quantity_id=variable_dict["quantity_id"]
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
