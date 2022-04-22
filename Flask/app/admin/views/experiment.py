import os

from dateutil import parser
from flask import abort, request, jsonify
from flask_cors import cross_origin
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import and_, inspect

from app.admin import admin
from app.admin.views.condition import create_condition
from app.admin.views.variable import create_variable
from app.models import Experiment, Condition, ConditionLevel, Level, Variable, Project, Hypothesis, ResponseVariable, \
    ProjectPartner
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update
from app.utils.authorisation import auth_check
from app.utils.functions import row2dict, jwt_user
from app.utils.images import image_processing
from app.utils.uploads import get_uploaded_file, content_folder


@admin.route('/experiment', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listExperiment():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    experiment = Experiment.query.all()
    return json_response(data=(row2dict(x, summary=True) for x in experiment))


@admin.route('/project/<int:id>/experiment', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def listExperimentForProject(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    project = Project.query.get_or_404(id)
    return json_response(data=(row2dict(x, summary=True) for x in project.experiments))


@admin.route('/experiment/<int:id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_one_experiment(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    experiment = Experiment.query.get_or_404(id)

    data = {
        "experiment_id": experiment.id,
        "name": experiment.title,
        "code": experiment.code,
        "project_id": experiment.project_id,
        "description": experiment.description,
        "image_full": os.path.join(content_folder('experiment', id, 'image'), 'full.png'),
        "image_thumb": os.path.join(content_folder('experiment', id, 'image'), 'thumb.png'),
        "tutorial": experiment.text,
        "start_date": experiment.start_date,
        "end_date": experiment.end_date,
        "hypotheses": [],
        "treatmentVariables": [],
        "responseVariables": [{
            "id": response_variable.id,
            "name": response_variable.variable.name,
            "unit": response_variable.variable.quantity.unit if response_variable.variable.quantity else None,
            "upper_limit": response_variable.variable.quantity.upper_limit if response_variable.variable.quantity else None,
            "lower_limit": response_variable.variable.quantity.lower_limit if response_variable.variable.quantity else None,
            "tutorial": response_variable.variable.procedure,
            "monday": response_variable.monday,
            "tuesday": response_variable.tuesday,
            "wednesday": response_variable.wednesday,
            "thursday": response_variable.thursday,
            "friday": response_variable.friday,
            "saturday": response_variable.saturday,
            "sunday": response_variable.sunday,
            "once": response_variable.once,
            "final": response_variable.final,
            "levels": sorted([{
                "id": l.id,
                "sequence": l.sequence,
                "name": l.name
            } for l in response_variable.variable.levels], key=lambda l: l["sequence"])
        } for response_variable in experiment.response_variables],
        "conditions": [{
            "id": condition.id,
            "code": condition.code,
            "description": condition.description,
            "text": condition.text,
            "colour": condition.colour,
            "status": condition.status,
            "units": [{
                "id": unit.id,
                "code": unit.code,
                "cube_level": unit.cube_level,
                "replicate_no": unit.replicate_no,
                "row": unit.grid_row,
                "column": unit.grid_column
            } for unit in condition.units]
        } for condition in experiment.conditions]
    }

    for treatment_variable in {cl.level.variable for c in experiment.conditions for cl in c.levels}:
        data["treatmentVariables"].append({
            "id": treatment_variable.id,
            "name": treatment_variable.name,
            "levels": sorted([{
                "id": l.id,
                "sequence": l.sequence,
                "name": l.name
            } for l in treatment_variable.levels], key=lambda l: l["sequence"])
        })

    if experiment.hypotheses:
        data["hypotheses"] = [{
            "id": hypothesis.id,
            "hypothesis_no": hypothesis.hypothesis_no,
            "description": hypothesis.description,
            "text": hypothesis.text,
            "status": hypothesis.status
        } for hypothesis in experiment.hypotheses]

    return data


@admin.route('/experiment', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def add_experiment():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    project_partner = ProjectPartner.query.filter(and_(ProjectPartner.project_id == data["project_id"],
                                                       ProjectPartner.school_id == current_user.school_id)).first()

    experiment = Experiment(
        project_id=data["project_id"],
        project_partner_id=project_partner.id,
        title=data["title"],
        description=data["description"],
        start_date=parser.parse(data["start_date"]),
        end_date=parser.parse(data["end_date"]),
        parent_id=data["parent_id"],
        code=data["code"],
        text=data["text"],
        status="active"
    )

    db.session.add(experiment)

    try:
        db.session.commit()
        audit_create("experiment", experiment.id, current_user.id)

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)

    if "hypotheses" in data.keys():
        for h in data["hypotheses"]:
            hypothesis = Hypothesis(
                experiment_id=experiment.id,
                hypothesis_no=h["hypothesis_no"],
                description=h["description"],
                status='active',
                text=h["text"]
            )

            db.session.add(hypothesis)
            try:
                db.session.commit()
                audit_create("hypothesis", hypothesis.id, current_user.id)

            except Exception as e:
                db.session.rollback()
                abort(409, e.orig.msg)

    # This array holds the data about treatment variables for later use
    treatment_variables = []
    for tv in data["treatmentVariables"]:
        try:
            variable = Variable.query.get_or_404(tv["id"])
        except:
            variable = create_variable(tv)
        treatment_variables.append(variable)

    for rv in data["responseVariables"]:
        try:
            variable_id = rv["id"]
        except:
            variable = create_variable(rv)

        response_variable = ResponseVariable(
            experiment_id=experiment.id,
            variable_id=variable.id,
            monday=rv["monday"],
            tuesday=rv["tuesday"],
            wednesday=rv["wednesday"],
            thursday=rv["thursday"],
            friday=rv["friday"],
            saturday=rv["saturday"],
            sunday=rv["sunday"],
            once=rv["once"],
            final=rv["final"]
        )

        db.session.add(response_variable)
        try:
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            abort(409, str(e))

    for c in data["conditions"]:
        create_condition(experiment, c, treatment_variables, current_user)

    return {"id": experiment.id}


@admin.route('/experiment/<int:id>/uploadImage', methods=['GET', 'PUT'])
@cross_origin(origin='http://127.0.0.1:8000/')
@jwt_required()
def upload_experiment_image(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'experiment', id, filename)

    return {"message": "Experiment image has been uploaded"}


@admin.route('/experiment/<int:experiment_id>', methods=['PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def updateExperiment(experiment_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, experiment_id)
    experiment_to_update = Experiment.query.get_or_404(experiment_id)
    new_experiment_data = request.get_json()

    experiment_to_update.description = new_experiment_data['description']
    experiment_to_update.end_date = new_experiment_data['end_date']
    experiment_to_update.text = new_experiment_data['text']
    experiment_to_update.status = new_experiment_data['status']

    audit_details = prepare_audit_details(inspect(Experiment), experiment_to_update, delete=False)

    message = "Experiment has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("experiment", experiment_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)
