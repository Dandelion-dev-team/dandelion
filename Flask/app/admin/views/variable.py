from flask import abort, jsonify, request
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.admin import admin
from app.admin.views.level import create_level
from app.models import Variable, Response, variable, ResponseVariable, Level
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update
from app.utils.authorisation import auth_check
from app.utils.error_messages import abort_db
from app.utils.functions import row2dict, jwt_user


def prepare_list(type = 'all'):
    if type == 'treatment':
        variables = Variable.query.filter(Variable.is_treatment == True).order_by(Variable.name).all()
    elif type == 'response':
        variables = Variable.query.filter(Variable.is_response == True).order_by(Variable.name).all()
    else:
        variables = Variable.query.order_by(Variable.name).all()

    data = []
    for variable in variables:
        row = row2dict(variable)
        row['quantity'] = ''
        row['unit'] = ''
        if variable.quantity_id:
            row['quantity'] = variable.quantity.name
            row['unit'] = variable.quantity.unit
        row['levels'] = []
        if len(variable.levels) > 0:
            row['levels'] = [row2dict(level) for level in sorted(variable.levels, key=lambda x: x.sequence)]
        data.append(row)

    return data


# This route is PUBLIC
@admin.route('/variable', methods=['GET'])
def list_variable():
    return {'data': prepare_list('all')}


@admin.route('/variable/treatment', methods=['GET'])
@jwt_required()
def list_treatment_variable():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    return {'data': prepare_list('treatment')}


@admin.route('/variable/response', methods=['GET'])
@jwt_required()
def list_response_variable():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    return {'data': prepare_list('response')}


# This route is PUBLIC
@admin.route('/variable/blank', methods=['GET'])
def get_blank_variable():
    variable = Variable()
    variable_data = row2dict(variable)
    variable_data["levels"] = ["",""]

    return {'data': variable_data}


@admin.route('/variable', methods=['POST'])
@jwt_required()
def add_variable():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()

    # Sanitise form values
    if data['quantity_id'] == '':
        data['quantity_id'] = None
    if data['is_sensor_quantity'] == '':
        data['is_sensor_quantity'] = False
    if data['is_treatment'] == '':
        data['is_treatment'] = False
    if data['is_response'] == '':
        data['is_response'] = False

    variable = Variable(
        name = data['name'],
        quantity_id = data['quantity_id'],
        is_sensor_quantity = data['is_sensor_quantity'],
        is_treatment = data['is_treatment'],
        is_response = data['is_response'],
        procedure = data['procedure'],
        status = data['status']
    )

    db.session.add(variable)
    return_status = 200
    message = "New variable has been registered"

    try:
        db.session.commit()
        audit_create("variable", variable.id, current_user.id)
        return {"message": message, "id": variable.id}

    except Exception as e:
        db.session.rollback()
        abort_db(e)


@admin.route('/variable/<int:id>', methods=['PUT'])
@jwt_required()
def updateVariable(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    variable_to_update = Variable.query.get_or_404(id)
    data = request.get_json()

    # Sanitise form values
    if data['quantity_id'] == '':
        data['quantity_id'] = None
    if data['is_sensor_quantity'] == '':
        data['is_sensor_quantity'] = False
    if data['is_treatment'] == '':
        data['is_treatment'] = False
    if data['is_response'] == '':
        data['is_response'] = False

    variable_to_update.name = data["name"]
    variable_to_update.quantity_id = data["quantity_id"]
    variable_to_update.is_sensor_quantity = data["is_sensor_quantity"]
    variable_to_update.is_treatment = data["is_treatment"]
    variable_to_update.is_response = data["is_response"]
    variable_to_update.procedure = data["procedure"]
    variable_to_update.status = data["status"]

    audit_details = prepare_audit_details(inspect(Variable), variable_to_update, delete=False)

    message = "Variable has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("school", variable_to_update.id, audit_details, current_user.id)

            return {"message": message}

        except Exception as e:
            db.session.rollback()
            abort_db(e)


# This route is PUBLIC
@admin.route('/variable/<int:id>', methods=['GET'])
def getFullVariable(id):
    variable = Variable.query.get_or_404(id)

    data = {
        "variable_id": variable.id,
        "name": variable.name,
        "status": variable.status,
        "is_sensor_quantity": variable.is_sensor_quantity,
        "procedure": variable.procedure,
        "quantity_id": variable.quantity_id,
        "quantity": [{
            "lower_limit": variable.quantity.lower_limit,
            "upper_limit": variable.quantity.upper_limit,
            "unit": variable.quantity.unit,
        }] if variable.quantity else None,
        "levels": sorted([{
            "id": l.id,
            "sequence": l.sequence,
            "treatment_name": variable.name,
            "name": l.name
        } for l in variable.levels], key=lambda l: l["sequence"])
    }

    return data


# This route is PUBLIC
@admin.route('/allVariables', methods=['GET'])
def listAllVariable():
    response_variable_demo = ResponseVariable.query.all()
    treatment_variable = Variable.query.all()
    output = []
    output2 = []

    for variable in treatment_variable:
        treatment_variable_data = {}
        treatment_variable_data['variable_id'] = variable.id
        treatment_variable_data['name'] = variable.name
        treatment_variable_data['status'] = variable.status
        treatment_variable_data['is_sensor_quantity'] = variable.is_sensor_quantity
        treatment_variable_data['procedure'] = variable.procedure
        treatment_variable_data['quantity_id'] = variable.quantity_id
        output.append(treatment_variable_data)

    for response_variable in response_variable_demo:
        response_variable_data = {}
        response_val = Variable.query.get_or_404(response_variable.variable_id)

        response_variable_data['name'] = response_val.name
        response_variable_data['response_id'] = response_variable.id
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

    return jsonify({'treatment': output}, {'response': output2})


# This route is PUBLIC
@admin.route('/discreteVariable', methods=['GET'])
def listAlldiscreteVariable():
    treatment_variable = Variable.query.all()
    output = []

    for variable in treatment_variable:
        treatment_variable_data = {}
        treatment_variable_data['id'] = variable.id
        treatment_variable_data['name'] = variable.name
        treatment_variable_data['status'] = variable.status
        treatment_variable_data['is_sensor_quantity'] = variable.is_sensor_quantity
        treatment_variable_data['procedure'] = variable.procedure
        treatment_variable_data['quantity_id'] = variable.quantity_id
        output.append(treatment_variable_data)

    return jsonify({'data': output})


@jwt_required()
def create_variable(variable_dict):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)

    if "quantity_id" in variable_dict:
        quantity_id = variable_dict["quantity_id"]
    else:
        quantity_id =None

    variable = Variable(
        name=variable_dict["name"],
        status='active',
        is_sensor_quantity=variable_dict["is_sensor_quantity"],
        procedure=variable_dict["procedure"],
        quantity_id=quantity_id
    )

    db.session.add(variable)
    try:
        db.session.commit()
        audit_create("variable", variable.id, current_user.id)

    except Exception as e:
        db.session.rollback()
        abort_db(e)

    if "levels" in variable_dict.keys():
        for l in variable_dict["levels"]:
            create_level(variable, l)

    return variable
