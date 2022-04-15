from flask import abort

from app import db
from app.models import ExperimentParticipant, User


def check_authorisation(current_user, authorisation_level):
    if authorisation_level == "sysadmin":
        sysadmin = current_user.is_sysadmin
        if not sysadmin:
            abort(403, 'This user does not have the proper level of authorisation to access this page')
        else:
            return True
    elif authorisation_level == "superuser":
        superuser = current_user.is_superuser
        if not superuser:
            abort(403, 'This user does not have the proper level of authorisation to access this page')
        else:
            return True
    elif authorisation_level == "experiment_participant":
        experiment_participant_exists = db.session.query(ExperimentParticipant).\
            filter_by(user_id=current_user.id). \
            first()
        if experiment_participant_exists is not None:
            return True
        elif current_user.is_sysadmin:
            return True
        elif current_user.is_superuser:
            return True
        else:
            abort(403, 'This user does not have the proper level of authorisation to access this page')
    elif authorisation_level == "school_user":
        school_user_exists = db.session.query(User).\
            filter_by(id=current_user.id, school_id=current_user.school_id).\
            first()
        if school_user_exists is not None:
            return True
        elif current_user.is_sysadmin:
            return True
        elif current_user.is_superuser:
            return True
        else:
            abort(403, 'This user does not have the proper level of authorisation to access this page')
    else:
        abort(403, 'This user does not have the proper level of authorisation to access this page')
