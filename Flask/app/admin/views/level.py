from flask import abort, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Level
from app import db
from app.utils.auditing import audit_create
from app.utils.authorisation import auth_check
from app.utils.error_messages import abort_db
from app.admin import admin
from app.utils.functions import row2dict, jwt_user


# This route is PUBLIC
@admin.route('/levelbyvariable/<int:id>', methods=['GET'])
def listLevelByVariable(id):
    levels = Level.query.filter(Level.variable_id == id).all()
    return {"data": [row2dict(x) for x in levels]}


@admin.route('/level', methods=['POST'])
@jwt_required()
def add_level():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    level = Level(
        name = data['name'],
	    variable_id = data['variable_id'],
        sequence = data['sequence'],
        procedure = data['procedure']
    )

    db.session.add(level)
    return_status = 200
    message = "New level has been registered"

    try:
        db.session.commit()
        audit_create("variable", level.id, current_user.id)
        return {"message": message, "id": level.id}

    except Exception as e:
        db.session.rollback()
        abort_db(e)


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
