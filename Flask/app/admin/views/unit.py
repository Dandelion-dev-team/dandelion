from flask import abort
from app.models import Unit
from app import db
from app.utils.error_messages import abort_db


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

