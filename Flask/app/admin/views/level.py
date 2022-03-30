from flask import abort
from app.models import Level
from app import db


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
		abort(409, e.orig.msg)

	return level
