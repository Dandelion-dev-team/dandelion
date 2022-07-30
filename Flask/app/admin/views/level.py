from flask import abort
from app.models import Level
from app import db
from app.utils.error_messages import abort_db


def create_level(variable, data):
	level = Level(
		variable_id=variable.id,
		name=data["name"],
		sequence=data["sequence"],
		description=data["description"],
		procedure=data["procedure"]
	)

	db.session.add(level)
	try:
		db.session.commit()

	except Exception as e:
		db.session.rollback()
		abort_db(e)

	return level
