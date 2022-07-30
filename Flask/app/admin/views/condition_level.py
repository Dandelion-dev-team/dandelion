from flask import abort
from app.models import ConditionLevel
from app import db
from app.utils.error_messages import abort_db


def create_condition_level(condition, level):
    condition_level = ConditionLevel(
        condition_id = condition.id,
        level_id = level.id
    )

    db.session.add(condition_level)
    try:
        db.session.commit()

    except Exception as e:
        db.session.rollback()
        abort_db(e)

    return True
