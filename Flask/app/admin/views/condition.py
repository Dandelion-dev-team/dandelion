from flask import abort
from flask_cors import cross_origin
from flask_json import json_response
from app.admin import admin
from app.admin.views.condition_level import create_condition_level
from app.admin.views.unit import create_unit
from app.models import Condition
from app import db
from app.utils.functions import row2dict


@admin.route('/condition', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def listCondition():
	condition = Condition.query.all()
	return json_response(data=(row2dict(x) for x in condition))


def create_condition(experiment, data, variable_list, user):
	condition = Condition(
		experiment_id = experiment.id,
		code = data["code"],
		colour = data["colour"],
		description = data["description"],
		status = 'active',
		text = data["text"]
	)

	db.session.add(condition)
	try:
		db.session.commit()

	except Exception as e:
		db.session.rollback()
		abort(409, e.orig.msg)

	for cl in data["condition_levels"]:
		level = get_level_from_cache(cl["variable_name"], cl["level_name"], variable_list)
		create_condition_level(condition, level)

	for u in data["units"]:
		create_unit(condition, u, user)


def get_level_from_cache(variable_name, level_name, variable_list):
	for variable in variable_list:
		if variable.name == variable_name:
			for level in variable.levels:
				if level.name == level_name:
					return level
	return None
