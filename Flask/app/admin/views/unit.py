from flask import abort, request
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect

from app.models import Unit, Condition
from app.admin import admin
from app import db
from app.utils.auditing import prepare_audit_details, audit_update, audit_create
from app.utils.authorisation import auth_check
from app.utils.error_messages import abort_db
from app.utils.functions import jwt_user, row2dict


# This route is PUBLIC
@admin.route('/unit/<int:experiment_id>', methods=['GET'])
def listUnitsByExperiment(experiment_id):
	units = Unit.\
		query.\
		join(Condition).\
		filter(Condition.experiment_id == experiment_id).\
		all()
	return json_response(data=(row2dict(x) for x in units))


@admin.route('/unit', methods=['POST'])
@jwt_required()
def add_unit():
	current_user = jwt_user(get_jwt_identity())
	authorised = auth_check(request.path, request.method, current_user)
	data = request.get_json()
	unit = Unit(
		condition_id = data["condition_id"],
		code = data["code"],
		grid_row = data["grid_row"],
		grid_column = data["grid_column"],
		cube_level = data["cube_level"],
		location = data["location"],
		replicate_no = data["replicate_no"],
		node_id = data["node_id"]
	)

	db.session.add(unit)
	return_status = 200
	message = "New unit has been saved"

	try:
		db.session.commit()
		audit_create("authority", unit.id, current_user.id)
		return {"message": message, "id": unit.id}

	except Exception as e:
		db.session.rollback()
		abort_db(e)


@admin.route('/unit/<int:id>', methods=['PUT'])
@jwt_required()
def updateUnit(id):
	current_user = jwt_user(get_jwt_identity())
	authorised = auth_check(request.path, request.method, current_user, id)
	unit = Unit.query.get_or_404(id)
	data = request.get_json()

	unit.condition_id = data["condition_id"]
	unit.code = data["code"]
	unit.grid_row = data["grid_row"]
	unit.grid_column = data["grid_column"]
	unit.cube_level = data["cube_level"]
	unit.location = data["location"]
	unit.replicate_no = data["replicate_no"]
	unit.node_id = data["node_id"]

	audit_details = prepare_audit_details(inspect(Unit), unit, delete=False)

	message = "Unit has been updated"

	if len(audit_details) > 0:
		try:
			db.session.commit()
			audit_update("authority", unit.id, audit_details, current_user.id)
			return {"message": message}

		except Exception as e:
			db.session.rollback()
			abort_db(e)
	else:
		return({'error': 'Unit record was not changed'})



def create_unit(condition, data, user):
	unit = Unit(
		condition_id = condition.id,
		code = data["code"],
		grid_column = data["column"],
		cube_level = data["cube_level"],
		location = data["location"],
		replicate_no = data["replicate_no"],
		grid_row = data["row"],
		node_id = user.school.nodes[0].id if data["cube_level"] else None
	)

	db.session.add(unit)
	try:
		db.session.commit()

	except Exception as e:
		db.session.rollback()
		abort_db(e)

	return True

