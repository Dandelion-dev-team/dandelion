from flask import abort, request
from flask_json import json_response
from flask_jwt_extended import get_jwt_identity

from app.admin import admin
from app.admin.views.condition_level import create_condition_level
from app.admin.views.unit import create_unit
from app.models import Condition
from app import db
from app.utils.authorisation import auth_check
from app.utils.error_messages import abort_db
from app.utils.functions import row2dict, jwt_user


# This route is PUBLIC
@admin.route('/condition', methods=['GET'])
def listCondition():
	condition = Condition.query.all()
	return json_response(data=(row2dict(x) for x in condition))


def create_condition(experiment, data, variable_list, user):

	colour = None
	if "colour" in data:
		colour = data["colour"]

	condition = Condition(
		experiment_id = experiment.id,
		code = data["code"],
		colour = colour,
		description = data["description"],
		status = 'active',
		text = data["text"]
	)

	db.session.add(condition)
	try:
		db.session.commit()

	except Exception as e:
		db.session.rollback()
		abort_db(e)

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
