import json
import os
from datetime import datetime, timedelta

import pandas as pd
from flask import request, current_app
from sqlalchemy import or_, and_, inspect, func, desc
from sqlalchemy.orm import aliased

from app import db
from app.admin import admin
from app.models import Observation, Experiment, School, Variable, SensorQuantity, ProjectPartner, Condition, Unit, \
    Level, ConditionLevel, ResponseVariable
from app.utils.uploads import content_folder
import logging
logger = logging.getLogger()


@admin.route('/data', methods=['POST'])
def get_data():
    request_data = request.get_json()
    experiment = Experiment.query.get_or_404(request_data['experiment_id'])
    project_partners = ProjectPartner.query.filter(and_(ProjectPartner.project_id == experiment.project_id,
                                                        or_(len(request_data["schools"]) == 0,
                                                            ProjectPartner.school_id.in_(request_data['schools'])))).all()
    project_partner_ids = [pp.id for pp in project_partners]
    related_experiments = get_related_experiments(experiment)
    related_experiments = [re for re in related_experiments if re.project_partner_id in project_partner_ids]

    df, y_axes = get_observations(related_experiments, request_data)

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

    return {"data": json.loads(df.to_json(date_format="iso", date_unit="s", orient="split")),
            "y_axes": y_axes}


@admin.route('/data_options/<int:experiment_id>', methods=['GET'])
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
    chart_types = []
    data_min_date = datetime.now() + timedelta(days=1)
    data_max_date = datetime.now() + timedelta(days=1)
    if data_count > 0:
        data_min_date = observations.order_by(Observation.timestamp).first().timestamp
        data_max_date = observations.order_by(Observation.timestamp.desc()).first().timestamp
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
                "value": tv.id,
                "label": tv.name,
                "checked": False,
                "children": [
                    {
                        "value": level.id,
                        "checked": False,
                        "label": level.name,
                        "level_sequence": level.sequence
                    } for level in tv.levels
                ]
            } for tv in treatment_variables
        ],
        "response_variables": [
            {
                "value": rv.variable.id,
                "checked": False,
                "name": rv.variable.name,
                "label": rv.variable.name + ' (' + "continuous" + ')' if rv.variable.quantity_id
                    else rv.variable.name + ' (' + "discrete" + ')' if len(rv.variable.levels) > 0
                    else rv.variable.name + ' (' + "qualitative" + ')',
                "variable_timing": "once" if rv.once else "final" if rv.final else "repeated",
                "variable_type": "continuous" if rv.variable.quantity_id else "discrete" if len(rv.variable.levels) > 0 else "qualitative",
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

    response_variables = Variable.\
        query.\
        filter(Variable.id.in_([rv['value'] for rv in data["response_variables"]])).\
        all()

    query = Observation.query. \
        join(Unit). \
        join(Condition). \
        join(Experiment). \
        filter(Experiment.id.in_([re.id for re in related_experiments])). \
        join(ProjectPartner). \
        join(School). \
        join(ResponseVariable, ResponseVariable.id == Observation.response_variable_id). \
        join(Variable). \
        filter(Variable.id.in_([rv['value'] for rv in data["response_variables"]]))

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

    max_date_plus_one = datetime.strptime(data["last_date"], "%Y-%m-%d") + timedelta(days=1)
    query = query.filter(and_(Observation.timestamp >= data["first_date"],
                              Observation.timestamp < str(max_date_plus_one.date())
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
    df_columns = [c.name for c in columns if c.name not in ("timestamp", "value")]
    df = df.pivot(index="timestamp", columns=df_columns, values="value")

    group_levels = []
    for i, level in enumerate(df_columns):
        if level in ['school', 'replicate no']:
            continue
        if level == 'response variable':
            group_levels.append(i)
            continue
        for tv in data["treatment_variables"]:
            if level == tv['name'] and len(tv["levels"]):
                group_levels.append(i)

    df = df.groupby(level=group_levels, axis=1).mean()
    df = df.round(decimals=2)

    y_axes = []

    for i, levels in enumerate(df.columns):
        response_variable = [rv for rv in response_variables if rv.name in levels][0]
        if len(response_variable.levels) > 0:
            df.iloc[:, i] = df.iloc[:, i].fillna(0).map(round)
            value_map = {l.sequence: l.name for l in response_variable.levels}
            df.iloc[:, i] = df.iloc[:, i].map(value_map)

            axis_exists = False
            for axis in y_axes:
                if axis['id'] == response_variable.id:
                    axis_exists = True

            if not axis_exists:
                y_axes.append({
                    "id": response_variable.id,
                    "name": response_variable.name,
                    "scale": [l.name for l in sorted(response_variable.levels,
                                                     key = lambda x: -x.sequence)]
                })

    return df, y_axes

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
