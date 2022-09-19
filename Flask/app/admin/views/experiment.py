import os
import itertools
from dateutil import parser
from flask import abort, request, jsonify
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from jwt import ExpiredSignatureError
from sqlalchemy import and_, inspect, or_, join

from app.admin import admin
from app.admin.views.condition import create_condition
from app.admin.views.variable import create_variable
from app.models import Experiment, Condition, ConditionLevel, Level, Variable, Project, Hypothesis, ResponseVariable, \
    ProjectPartner, Observation, User, ExperimentParticipant
from app import db
from app.utils.auditing import audit_create, prepare_audit_details, audit_update
from app.utils.authorisation import auth_check
from app.utils.error_messages import abort_db
from app.utils.functions import row2dict, jwt_user, has_observations
from app.utils.images import image_processing
from app.utils.uploads import get_uploaded_file, content_folder


# This route is PUBLIC
@admin.route('/experiment', methods=['GET'])
def listExperiment():
    current_user = None
    try:
        verify_jwt_in_request(optional=True)
        current_user = jwt_user(get_jwt_identity())
    except ExpiredSignatureError:
        pass

    if current_user:
        experiment = Experiment. \
            query. \
            join (ProjectPartner). \
            filter(or_(Experiment.status == 'active',
                       ProjectPartner.school_id == current_user.school_id)). \
            all()
    else:
        experiment = Experiment. \
            query. \
            filter(Experiment.status == 'active'). \
            all()

    return json_response(data=(row2dict(x, summary=True) for x in experiment))


# This route is PUBLIC
@admin.route('/experiment/blank', methods=['GET'])
def get_blank_experiment():
    experiment = Experiment()

    data = row2dict(experiment, summary=True)
    data['image_full'] = os.path.join(content_folder('experiment', 0, 'image'), 'full.png')
    data['image_thumb'] = os.path.join(content_folder('experiment', 0, 'image'), 'thumb.png')

    return {'data': data}


# This route is PUBLIC
@admin.route('/experiment/filtered/<int:project_id>', methods=['GET'])
@jwt_required()
def listExperimentFiltered(project_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, project_id)
    project = Project.query.get_or_404(project_id)
    project_partner = ProjectPartner.\
        query.\
        filter(and_(ProjectPartner.project_id == project.id,
                    ProjectPartner.is_lead_partner == True)).\
        first()

    experiment = Experiment \
        .query \
        .join (ProjectPartner) \
        .filter(ProjectPartner.is_lead_partner == True) \
        .filter(Experiment.parent_id == None) \
        .filter(Experiment.status == 'active')\
        .filter(or_(project_partner.school_id == current_user.school_id,
                    ProjectPartner.project_id == project.id)) \
        .all()

    data = [row for row in (row2dict(x, summary=True) for x in experiment)]

    for row in data:
        row['image_thumb'] = os.path.join(content_folder('experiment', row['id'], 'image'), 'thumb.png'),

    return {'data': data}


# This route is PUBLIC
@admin.route('/project/<int:id>/experiment', methods=['GET'])
def listExperimentForProject(id):
    project = Project.query.get_or_404(id)
    logged_in = False
    try:
        verify_jwt_in_request(optional=True)
        logged_in = True
    except ExpiredSignatureError:
        pass

    if logged_in:
        current_user = jwt_user(get_jwt_identity())

        data = [row for row in (row2dict(x, summary=True) for x in project.experiments
                                if x.project_partner.id == current_user.school_id
                                or (x.status == 'active' and x.project_partner.is_lead_partner == True))]
    else:
        data = [row for row in (row2dict(x, summary=True) for x in project.experiments
                                if x.status == 'active' and x.project_partner.is_lead_partner == True)]

    for row in data:
        row['image_thumb'] = os.path.join(content_folder('experiment', row['id'], 'image'), 'thumb.png'),
        row['image_full'] = os.path.join(content_folder('experiment', row['id'], 'image'), 'full.png'),

    return {'data': data}


# This route is PUBLIC
@admin.route('/experiment/<int:id>', methods=['GET'])
def get_one_experiment(id):
    experiment = Experiment.query.get_or_404(id)

    data = {
        "id": experiment.id,
        "owner": experiment.project_partner.school.name,
        "title": experiment.title,
        "code": experiment.code,
        "project_id": experiment.project_id,
        "project_title": experiment.project.title,
        "description": experiment.description,
        "text": experiment.text,
        "image_full": os.path.join(content_folder('experiment', id, 'image'), 'full.png'),
        "image_thumb": os.path.join(content_folder('experiment', id, 'image'), 'thumb.png'),
        "tutorial": experiment.text,
        "start_date": experiment.start_date,
        "end_date": experiment.end_date,
        "status": experiment.status,
        "parent_id": experiment.parent_id,
        "hypotheses": [],
        "treatment_variables": [],
        "response_variables": [{
            "id": response_variable.id,
            "variable_id": response_variable.variable.id,
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
                "grid_row": unit.grid_row,
                "grid_column": unit.grid_column
            } for unit in condition.units]
        } for condition in experiment.conditions],
        "participants": [
            participant.user_id for participant in experiment.participants
        ]
    }

    # ToDo: change variable_id to just  id
    for treatment_variable in {cl.level.variable for c in experiment.conditions for cl in c.levels}:
        data["treatment_variables"].append({
            "variable_id": treatment_variable.id,
            "name": treatment_variable.name,
            "levels": sorted([{
                "id": l.id,
                "sequence": l.sequence,
                "treatment_name": treatment_variable.name,
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
@jwt_required()
def add_experiment():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    project_partner = ProjectPartner.query.filter(and_(ProjectPartner.project_id == data["project_id"],
                                                       ProjectPartner.school_id == current_user.school_id)).first()

    # Sanitise form values
    if data['parent_id'] == '':
        data['parent_id'] = None

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
        status="draft"
    )

    db.session.add(experiment)

    try:
        db.session.commit()
        audit_create("experiment", experiment.id, current_user.id)

    except Exception as e:
        db.session.rollback()
        abort_db(e)

    return {"id": experiment.id}


@admin.route('/experiment/<int:id>/uploadImage', methods=['PUT', 'POST'])
@jwt_required()
def upload_experiment_image(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    pic, filename = get_uploaded_file(request)
    image_processing(pic, 'experiment', id, filename)

    return {"message": "Experiment image has been uploaded"}


@admin.route('/experiment/<int:experiment_id>', methods=['PUT'])
@jwt_required()
def updateExperiment(experiment_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, experiment_id)
    experiment_to_update = Experiment.query.get_or_404(experiment_id)
    new_experiment_data = request.get_json()

    experiment_to_update.title = new_experiment_data['title']
    experiment_to_update.code = new_experiment_data['code']
    experiment_to_update.description = new_experiment_data['description']
    experiment_to_update.text = new_experiment_data['text']
    experiment_to_update.start_date = new_experiment_data['start_date']
    experiment_to_update.end_date = new_experiment_data['end_date']
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
            abort_db(e)


@admin.route('/experiment/<int:experiment_id>/treatment', methods=['PUT'])
@jwt_required()
def update_treatment_vars(experiment_id):
    """
    This function assumes that the experiment is not yet in use. A check is made for any stored
    observations before any changes are made. If observations exist, no changes are allowed.
    The process is to delete any existing conditions, condition levels and units and start again.
    If conditions have been previously selected or deselected, this information will be lost, as
    will any colours assigned to particular conditions.
    TVs are implicit: modifications mean changes to conditions and condition levels
    The Condition model is configured to cascade deletes to ConditionLevels and Units
    """

    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    authorised = auth_check(request.path, request.method, current_user, experiment_id)
    experiment = Experiment.query.get_or_404(experiment_id)

    if has_observations(experiment):
        abort(409, "This experiment has observations and can't be changed")

    # Delete existing condition data - condition levels and units are also deleted because of the cascades
    for condition in experiment.conditions:
        db.session.delete(condition)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort_db(e)

    variables = Variable.query.filter(Variable.id.in_(data['variables'])).all()

    # Extract lists of level ids and names for each treatment variable
    level_data = []
    for tv in variables:
        level_data.append([{'id': l.id, 'name': l.name, 'variable_name': tv.name} for l in tv.levels])

    # Generate unique abbreviations for each level
    new_level_data = []
    for level_set in level_data:
        # The next line assumes that a max 4-char abbreviation will be enough
        for characters in range(1, 5):
            level_set = [{
                'id': ls['id'],
                'name': ls['name'],
                'variable_name': ls['variable_name'],
                'code': ls['name'][0:characters]} for ls in level_set]
            if len(set(ls['code'] for ls in level_set)) == len(set(ls['name'] for ls in level_set)):
                new_level_data.append(level_set)
                break

    # Generate the possible combinations of variable levels
    condition_data = list(itertools.product(*new_level_data))

    # For each combination, create condition and condition level records
    for combination in condition_data:
        condition = Condition(
            experiment_id=experiment.id,
            code='-'.join(level['code'] for level in combination),
            description='; '.join(level['variable_name'] + ': ' + level['name'] for level in combination),
            status='active'
        )
        try:
            db.session.add(condition)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort_db(e)

        for level in combination:
            condition_level = ConditionLevel(
                condition_id=condition.id,
                level_id=level['id']
            )
            try:
                db.session.add(condition_level)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort_db(e)

    return {'msg': 'Experimental conditions generated'}


@admin.route('/experiment/<int:experiment_id>/response', methods=['PUT'])
@jwt_required()
def update_response_vars(experiment_id):
    """
    This function assumes that the experiment is not yet in use. A check is made for any stored
    observations before any changes are made. If observations exist, no changes are allowed.
    The process is to delete any existing response variables and start again.
    If response variables have been previously been configured with a measurement schedule,
    this information will be lost.
    """

    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    authorised = auth_check(request.path, request.method, current_user, experiment_id)
    experiment = Experiment.query.get_or_404(experiment_id)

    if has_observations(experiment):
        abort(409, "This experiment has observations and can't be changed")

    # Delete existing records
    for rv in experiment.response_variables:
        db.session.delete(rv)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort_db(e)

#     variables = Variable.query.filter(Variable.id.in_(data['variables'])).all()
#

    # Recreate from the parameter list
    for variable in data:

        # Sanitise form values
        if variable['once'] == '':
            variable['once'] = False
        if variable['final'] == '':
            variable['final'] = False
        if variable['monday'] == '':
            variable['monday'] = False
        if variable['tuesday'] == '':
            variable['tuesday'] = False
        if variable['wednesday'] == '':
            variable['wednesday'] = False
        if variable['thursday'] == '':
            variable['thursday'] = False
        if variable['friday'] == '':
            variable['friday'] = False
        if variable['saturday'] == '':
            variable['saturday'] = False
        if variable['sunday'] == '':
            variable['sunday'] = False

        rv = ResponseVariable(
            experiment_id = experiment_id,
            variable_id = variable['variable_id'],
            monday = variable['monday'],
            tuesday = variable['tuesday'],
            wednesday = variable['wednesday'],
            thursday = variable['thursday'],
            friday = variable['friday'],
            saturday = variable['saturday'],
            sunday = variable['sunday'],
            once = variable['once'],
            final = variable['final']
        )
        db.session.add(rv)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort_db(e)

    return {'msg': 'Response variables saved'}


@admin.route('/experiment/<int:experiment_id>/hypotheses', methods=['PUT'])
@jwt_required()
def update_hypotheses(experiment_id):
    """
    This function assumes that the experiment is not yet in use. A check is made for any stored
    observations before any changes are made. If observations exist, no changes are allowed.
    The process is to delete any existing hypotheses and start again.
    """

    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    authorised = auth_check(request.path, request.method, current_user, experiment_id)
    experiment = Experiment.query.get_or_404(experiment_id)

    if has_observations(experiment):
        abort(409, "This experiment has observations and can't be changed")

    # Delete existing records
    for hypothesis in experiment.hypotheses:
        db.session.delete(hypothesis)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort_db(e)

    # Recreate from the parameter list
    for item in data:
        hypothesis = Hypothesis(
            experiment_id=experiment_id,
            hypothesis_no=item["hypothesis_no"],
            description=item["description"],
            status="active"
        )
        db.session.add(hypothesis)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        abort_db(e)

    return {'msg': 'Hypotheses saved'}


@admin.route('/experiment/<int:experiment_id>/conditions', methods=['PUT'])
@jwt_required()
def update_conditions(experiment_id):
    """
    This function assumes that the experiment is not yet in use. A check is made for any stored
    observations before any changes are made. If observations exist, no changes are allowed.
    """

    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    authorised = auth_check(request.path, request.method, current_user, experiment_id)
    experiment = Experiment.query.get_or_404(experiment_id)

    if has_observations(experiment):
        abort(409, "This experiment has observations and can't be changed")

    for condition in experiment.conditions:
        if condition.id in data['selected_conditions']:
            condition.status = 'active'
        else:
            condition.status = 'deselected'

        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort_db(e)

    return {'msg': 'Conditions saved'}


@admin.route('/experiment/<int:experiment_id>/participants', methods=['PUT'])
@jwt_required()
def update_participants(experiment_id):
    """
    This function assumes that the experiment is in use. The process is:

    for each current participant:
        if they have been de-selected:
            if they have made observations:
                keep the participant record but set the status to 'disabled'
            else:
                delete the participant record
    for each newly-selected participant:
        if a disabled record exists:
            update the status to 'active'
        else:
            create a participant record

    """

    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    data['selected_users'] = list(map(lambda x: int(x), data['selected_users']))
    authorised = auth_check(request.path, request.method, current_user, experiment_id)
    experiment = Experiment.query.get_or_404(experiment_id)

    for participant in experiment.participants:
        if participant.user_id not in data['selected_users']:
            observations = Observation.\
                query.\
                join(User).\
                join(ExperimentParticipant).\
                filter(ExperimentParticipant.id == participant.id).\
                join(ResponseVariable).\
                filter(ResponseVariable.experiment_id == experiment.id).\
                count()

            dummy = "pass"
            if observations == 0:
                db.session.delete(participant)
            else:
                participant.status = 'disabled'
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                abort_db(e)
        try:
            data['selected_users'].remove(participant.user_id)
        except:
            pass

    for user_id in data['selected_users']:
        participant = ExperimentParticipant.\
            query.\
            filter(ExperimentParticipant.user_id == user_id).\
            filter(ExperimentParticipant.experiment_id == experiment.id).\
            first()

        if participant:
            participant.status = 'active'
        else:
            participant = ExperimentParticipant(
                user_id=user_id,
                experiment_id = experiment.id,
                status='active'
            )
            db.session.add(participant)
        try:
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort_db(e)

    return {'msg': 'Experiment participants updated'}


@admin.route('/experiment/<int:experiment_id>/status', methods=['PUT'])
@jwt_required()
def update_status(experiment_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, experiment_id)
    experiment = Experiment.query.get_or_404(experiment_id)
    data = request.get_json()

    experiment.status = data['status']

    audit_details = prepare_audit_details(inspect(Experiment), experiment, delete=False)

    message = "Experiment status has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("experiment", experiment.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort_db(e)


@admin.route('/experiment/<int:parent_id>/clone', methods=['POST'])
@jwt_required()
def clone_experiment(parent_id):
    """
    This function makes a complete copy of an experiment. It is used in the case of a shared project
    where it is important that all of the partners follow the same pattern.
    The sequence is
    - Copy experiment record
    - Copy conditions and levels
    - Copy response variables
    - Copy hypotheses
    """
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, parent_id)
    parent = Experiment.query.get_or_404(parent_id)
    data = request.get_json()
    project_partner = ProjectPartner.\
        query.\
        filter(and_(ProjectPartner.school_id == current_user.school_id,
                    ProjectPartner.project_id == data['project_id'])).\
        first()

    experiment = Experiment(
        project_id = data['project_id'],
        project_partner_id = project_partner.id,
        title = parent.title,
        description = parent.description,
        start_date = parent.start_date,
        end_date = parent.end_date,
        status = 'active',
        parent_id = parent_id,
        code = parent.code,
        text = parent.text
    )

    db.session.add(experiment)

    try:
        db.session.commit()
        audit_create("experiment", experiment.id, current_user.id)

    except Exception as e:
        db.session.rollback()
        abort_db(e)

    for parent_condition in parent.conditions:
        condition = Condition(
            experiment_id = experiment.id,
            description = parent_condition.description,
            status = parent_condition.status,
            code = parent_condition.code,
            text = parent_condition.text,
            colour = parent_condition.colour
        )

        db.session.add(condition)

        try:
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            abort_db(e)

        for parent_level in parent_condition.levels:
            condition_level = ConditionLevel(
                condition_id = condition.id,
                level_id = parent_level.level_id
            )

            db.session.add(condition_level)

            try:
                db.session.commit()

            except Exception as e:
                db.session.rollback()
                abort_db(e)

    for parent_response in parent.response_variables:
        response_variable = ResponseVariable(
            experiment_id = experiment.id,
            variable_id = parent_response.variable_id,
            monday = parent_response.monday,
            tuesday=parent_response.tuesday,
            wednesday=parent_response.wednesday,
            thursday=parent_response.thursday,
            friday=parent_response.friday,
            saturday=parent_response.saturday,
            sunday=parent_response.sunday,
            once=parent_response.once,
            final=parent_response.final,

        )

        db.session.add(response_variable)

        try:
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            abort_db(e)

    for parent_hypothesis in parent.hypotheses:
        hypothesis = Hypothesis(
            experiment_id = experiment.id,
            hypothesis_no = parent_hypothesis.hypothesis_no,
            description = parent_hypothesis.description,
            text = parent_hypothesis.text,
            status = 'active'
        )

        db.session.add(hypothesis)

        try:
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            abort_db(e)

    return {'msg': 'Experiment copied', 'id': experiment.id}
