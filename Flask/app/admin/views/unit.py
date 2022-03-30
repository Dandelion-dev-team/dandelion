from flask import abort
from app.models import Unit
from app import db


def create_unit(condition, data, user):
	unit = Unit(
		condition_id = condition.id,
		code = data["code"],
		grid_column = data["column"],
		cube_level = data["cube_level"],
		location = data["location"],
		replicate_no = data["replicate_no"],
		grid_row = data["row"],
		node_id = user.school.node[0].id if data["cube_level"] else None
	)

	db.session.add(unit)
	try:
		db.session.commit()

	except Exception as e:
		db.session.rollback()
		abort(409, e.orig.msg)

	return True

