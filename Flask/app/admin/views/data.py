import json
import os

import pandas as pd
from flask import request, current_app
from flask_cors import cross_origin
from sqlalchemy import or_, and_, inspect
from sqlalchemy.orm import aliased

from app import db
from app.admin import admin
from app.models import Observation, Experiment, School, Variable, SensorQuantity, ProjectPartner, Condition, Unit, \
    Level, ConditionLevel, ResponseVariable
from app.utils.uploads import content_folder
import logging
logger = logging.getLogger()


@admin.route('/data', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def get_data():
    request_data = request.get_json()
    experiment = Experiment.query.get_or_404(request_data['experiment_id'])
    project_partners = ProjectPartner.query.filter(and_(ProjectPartner.project_id == experiment.project_id,
                                                        or_(len(request_data["schools"]) == 0,
                                                            ProjectPartner.school_id.in_(request_data['schools'])))).all()
    project_partner_ids = [pp.id for pp in project_partners]
    related_experiments = get_related_experiments(experiment)
    related_experiments = [re for re in related_experiments if re.project_partner_id in project_partner_ids]

    df = get_observations(related_experiments, request_data)

    if request_data["sensor_quantity"]:
        df_sensor = prepare_sensor_df(request_data["first_date"], request_data["last_date"])
        df = df.reindex(df_sensor.index)
        if len(request_data["schools"]) == 1:
            node_dir = content_folder("node", project_partners[0].school.nodes[0].id, "data")
            for cube_level in ("top", "middle", "bottom"):
                df_sensor[cube_level] = get_quantity_from_file(node_dir,
                                                               cube_level + ".csv",
                                                               request_data["first_date"],
                                                               request_data["last_date"],
                                                               df_sensor.index,
                                                               request_data["sensor_quantity"])
                column_header = [None] * df.columns.nlevels
                column_header[0] = request_data["sensor_quantity"]
                column_header[1] = cube_level
                df[tuple(column_header)] = df_sensor[cube_level]

        else:
            for nid in [pp.school.nodes[0].id for pp in project_partners]:
                node_dir = content_folder("node", nid, "data")
                for cube_level in ("top", "middle", "bottom"):
                    df_sensor[str(nid) + cube_level] = get_quantity_from_file(node_dir,
                                                                              cube_level + ".csv",
                                                                              request_data["first_date"],
                                                                              request_data["last_date"],
                                                                              df_sensor.index,
                                                                              request_data["sensor_quantity"])


            df[request_data["sensor_quantity"]] = df_sensor.groupby([1 for c in df_sensor.columns], axis=1).mean()
        df = df.dropna(axis=0, how='all')

    return {"data": json.loads(df.to_json(date_format="iso", date_unit="s", orient="split"))}


@admin.route('/data_options/<int:experiment_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def get_data_selection_options(experiment_id):
    experiment = Experiment.query.get_or_404(experiment_id)

    related_experiments = get_related_experiments(experiment)
    schools = [re.project_partner.school for re in related_experiments]

    sensor_quantity_ids = []
    for ns in experiment.project_partner.school.nodes[0].node_sensors:
        for sq in ns.sensor.sensor_quantities:
            sensor_quantity_ids.append(sq.id)
    sensor_quantities = SensorQuantity.query.filter(SensorQuantity.id.in_(set(sensor_quantity_ids))).all()

    tv_ids = []
    for c in experiment.conditions:
        for cl in c.levels:
            tv_ids.append(cl.level.variable_id)
    treatment_variables = Variable.query.filter(Variable.id.in_(tv_ids)).all()

    all_response_variable_ids = []
    for re in related_experiments:
        all_response_variable_ids.extend([rv.id for rv in re.response_variables])
    all_response_variable_ids = set(all_response_variable_ids)

    observations = Observation.query.filter(Observation.response_variable_id.in_(all_response_variable_ids))
    data_count = observations.count()
    data_min_date = observations.order_by(Observation.timestamp).first().timestamp
    data_max_date = observations.order_by(Observation.timestamp.desc()).first().timestamp
    chart_types = []
    if data_count > 0:
        chart_types.append('line')
        chart_types.append('bar')
        for rv in experiment.response_variables:
            if len(rv.variable.levels) > 0:
                chart_types.append('pie')
                break

    data = {
        "experiment_id": experiment.id,
        "start_date": experiment.start_date,
        "end_date": experiment.end_date,
        "data_count": data_count,
        "data_min_date": data_min_date,
        "data_max_date": data_max_date,
        "chart_types": chart_types,
        "schools": [
            {
                "school_id": s.id,
                "school_name": s.name
            } for s in schools
        ],
        "treatment_variables": [
            {
                "variable_id": tv.id,
                "variable_name": tv.name,
                "levels": [
                    {
                        "level_id": level.id,
                        "level_name": level.name,
                        "level_sequence": level.sequence
                    } for level in tv.levels
                ]
            } for tv in treatment_variables
        ],
        "response_variables": [
            {
                "variable_id": rv.variable.id,
                "variable_name": rv.variable.name,
                "variable_timing": "once" if rv.once else "final" if rv.final else "repeated",
                "variable_type": "continuous" if rv.variable.quantity_id else "discrete" if len(rv.variable.levels) > 0 else "qualitative",
                "levels": [
                    {
                        "level_id": level.id,
                        "level_name": level.name,
                        "level_sequence": level.sequence
                    } for level in rv.variable.levels
                ]
            } for rv in experiment.response_variables
        ],
        "sensor_quantities": [
            {
                "quantity_name": sq.label,
                "sensor_quantity_id": sq.id
            } for sq in sensor_quantities
        ]
    }

    return {"data": data}


def get_related_experiments(experiment):
    if experiment.parent_id:
        related_experiments = Experiment.query.filter(or_(Experiment.parent_id == experiment.parent_id,
                                                          Experiment.id == experiment.parent_id)).all()
    else:
        related_experiments = Experiment.query.filter(or_(Experiment.parent_id == experiment.id,
                                                          Experiment.id == experiment.id)).all()
    return related_experiments

def get_units(treatment_variables, experiment_ids):
    # Prepare aliases
    variables = {}
    levels = {}
    condition_levels = {}

    query = Unit.query. \
        join(Condition). \
        join(Experiment). \
        join(ProjectPartner). \
        join(School). \
        filter(Experiment.id.in_(experiment_ids))

    for tv in treatment_variables:
        variables[tv['name']] = aliased(Variable)
        levels[tv['name']] = aliased(Level)
        condition_levels[tv['name']] = aliased(ConditionLevel)

        query = query. \
            join(condition_levels[tv['name']], condition_levels[tv['name']].condition_id == Condition.id). \
            join(levels[tv['name']], levels[tv['name']].id == condition_levels[tv['name']].level_id). \
            join(variables[tv['name']], variables[tv['name']].id == levels[tv['name']].variable_id). \
            filter(variables[tv['name']].id == tv['variable_id']). \
            filter(levels[tv['name']].id.in_(tv['levels']))

    columns = [
        Unit.id,
        Unit.code,
        School.name
    ]
    for level in levels:
        columns.append(levels[level].name.label(level))

    return query.with_entities(*columns)

def get_observations(related_experiments, data, ):
    # Prepare aliases
    variables = {}
    levels = {}
    condition_levels = {}

    query = Observation.query. \
        join(Unit). \
        join(Condition). \
        join(Experiment). \
        filter(Experiment.id.in_([re.id for re in related_experiments])). \
        join(ProjectPartner). \
        join(School). \
        join(ResponseVariable, ResponseVariable.id == Observation.response_variable_id). \
        join(Variable). \
        filter(Variable.id.in_(data["response_variables"]))

    for tv in data["treatment_variables"]:
        variables[tv['name']] = aliased(Variable)
        levels[tv['name']] = aliased(Level)
        condition_levels[tv['name']] = aliased(ConditionLevel)

        query = query. \
            join(condition_levels[tv['name']], condition_levels[tv['name']].condition_id == Condition.id). \
            join(levels[tv['name']], levels[tv['name']].id == condition_levels[tv['name']].level_id). \
            join(variables[tv['name']], variables[tv['name']].id == levels[tv['name']].variable_id). \
            filter(variables[tv['name']].id == tv['variable_id']). \
            filter(or_(len(tv["levels"]) == 0, levels[tv['name']].id.in_(tv['levels'])))

    query = query.filter(and_(Observation.timestamp >= data["first_date"],
                              Observation.timestamp <= data["last_date"]
                             ))

    columns = [
        Observation.timestamp.label("timestamp"),
        School.name.label("school")
    ]

    for level in levels:
        columns.append(levels[level].name.label(level))

    columns.extend([
        Variable.name.label("response variable"),
        Unit.replicate_no.label("replicate no"),
        Observation.value.label("value")
    ])

    observations = query.with_entities(*columns).all()

    df = pd.DataFrame([dict(o._mapping) for o in observations])
    df = df.pivot(index="timestamp", columns=[c.name for c in columns if c.name not in ("timestamp", "value")], values="value")

    group_columns = []
    if len(data["schools"]):
        group_columns.append("school")
    for tv in data["treatment_variables"]:
        if len(tv["levels"]):
            group_columns.append(tv["name"])
    group_columns.append("response variable")
    if not data["average_over_replicates"]:
        group_columns.append(("replicate no"))

    df = df.groupby(group_columns, axis=1).mean()
    df = df.round(decimals=2)

    return df

def get_quantity_from_file(node_dir, filename, first_date, last_date, index, quantity):
    df = pd.read_csv(
        os.path.join(node_dir, filename),
        index_col="timestamp",
        parse_dates=True,
        infer_datetime_format=True,
        dayfirst=True
    )
    df.index = df.index.round('H')
    series = df.loc[first_date:last_date, quantity]
    series.name = quantity
    series = series.groupby(series.index).mean()
    series = series.reindex(index)

    return series

def prepare_sensor_df(first_date, last_date):
    index = pd.DatetimeIndex(
        pd.date_range(
            first_date,
            last_date,
            freq="1H",
            inclusive='both'
        ))

    return pd.DataFrame(index=index)
