from flask import abort, request
from app import db
from app.models import ExperimentParticipant, User


def auth_check(route, method, current_user=None):

    all_routes = [
        {"route": "/api/authority", "method": "GET", "auth_level": "public"},
        {"route": "/api/authority", "method": "POST", "auth_level": "sysadmin"},
        {"route": "/api/authority/id", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/authority/id", "method": "PUT", "auth_level": "sysadmin"},
        {"route": "/api/authority/id", "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/condition", "method": "GET", "auth_level": "public"},
        {"route": "/api/experiment/id", "method": "GET", "auth_level": "school_user"},
        {"route": "/api/project/id/experiment", "method": "GET", "auth_level": "experiment_participant"},
        {"route": "/api/experiment/id", "method": "GET", "auth_level": "experiment_participant"},
        {"route": "/api/experiment", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/experiment/id/uploadimage", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/experiment/id", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/experiment_participant", "method": "GET", "auth_level": "public"},
        {"route": "/api/experiment_participant/add", "method": "POST", "auth_level": "public"},
        {"route": "/api/experiment_participant/user_id", "method": "GET", "auth_level": "public"},
        {"route": "/api/experiment_participant/experiment_id/user_id ", "method": "POST", "auth_level": "public"},
        {"route": "/api/experiment_participant/updatestatus/experiment_participant_id ", "method": "PUT",
         "auth_level": "public"},
        {"route": "/api/experiment_participant/delete/experiment_participant_id", "method": "DELETE",
         "auth_level": "public"},
        {"route": "/api/hypothesis ", "method": "GET", "auth_level": "school_user"},
        {"route": "/api/node", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/node/id", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node/id", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/node/id", "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/node/id/uploaddata", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/node/latest/node_id ", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node_sensor", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node_alert", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node_alert/active_alerts", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node_alert/node_alert_id", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/node_sensor", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/observation", "method": "GET", "auth_level": "public"},
        {"route": "/api/observation/id/uploadImage", "method": "POST", "auth_level": "public"},
        {"route": "/api/observation", "method": "POST", "auth_level": "public"},
        {"route": "/api/observation/multiple", "method": "POST", "auth_level": "public"},
        {"route": "/api/observation/obs_id", "method": "PUT", "auth_level": "public"},
        {"route": "/api/observation/update/obs_id", "method": "PUT", "auth_level": "public"},
        {"route": "/api/observation/byuser/user_id", "method": "GET", "auth_level": "public"},
        {"route": "/api/observation/delete/obs_id", "method": "DELETE", "auth_level": "public"},
        {"route": "/api/project", "method": "GET", "auth_level": "public"},
        {"route": "/api/project", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project/id", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/project/id", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/project/id", "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/project/id/uploadImage", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project_leader", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/project_leader", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project_leader/id", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/project_leader/id", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/project_leader/id", "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/project_partner", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/project_partner", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project_partner/project_id/school_id", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project_partner/school_id ", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/project_partner/invitation_details/project_partner_id", "method": "GET",
         "auth_level": "superuser"},
        {"route": "/api/project_partner/<int:id>", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/project_partner/<int:id>", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/project_partner/update_invitation/project_partner_id>", "method": "PUT",
         "auth_level": "superuser"},
        {"route": "/api/project_partner/<int:id>", "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/quantity", "method": "GET", "auth_level": "experiment_participant"},
        {"route": "/api/quantity", "method": "POST", "auth_level": "experiment_participant"},
        {"route": "/api/quantity/<int:id>", "method": "GET", "auth_level": "experiment_participant"},
        {"route": "/api/quantity/<int:id>", "method": "PUT", "auth_level": "experiment_participant"},
        {"route": "/api/quantity/<int:id>", "method": "DELETE", "auth_level": "experiment_participant"},
        {"route": "/api/report", "method": "GET", "auth_level": "public"},
        {"route": "/api/response", "method": "GET", "auth_level": "school_user"},
        {"route": "/api/school", "method": "GET", "auth_level": "public"},
        {"route": "/api/school", "method": "POST", "auth_level": "sysadmin"},
        {"route": "/api/school/id", "method": "GET", "auth_level": "public"},
        {"route": "/api/school/id", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/school/id", "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/school/<int:id>/uploadImage", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/sensor", "method": "GET", "auth_level": "sysadmin"},
        {"route": "/api/sensor", "method": "POST", "auth_level": "sysadmin"},
        {"route": "/api/sensor/id", "method": "GET", "auth_level": "sysadmin"},
        {"route": "/api/sensor/id", "method": "PUT", "auth_level": "sysadmin"},
        {"route": "/api/sensor/id", "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/sensorQuantity", "method": "POST", "auth_level": "sysadmin"},
        {"route": "/api/sensorQuantity/<int:id>", "method": "GET", "auth_level": "sysadmin"},
        {"route": "/api/sensorQuantity/<int:id>", "method": "PUT", "auth_level": "sysadmin"},
        {"route": "/api/sensorQuantity/<int:id>", "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/session", "method": "GET", "auth_level": "sysadmin"},
        {"route": "/api/tagreference", "method": "GET", "auth_level": "public"},
        {"route": "/api/tagreference", "method": "POST", "auth_level": "experiment_participant"},
        {"route": "/api/tagreference/<int:id>", "method": "GET", "auth_level": "experiment_participant"},
        {"route": "/api/tagreference/<int:id>", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/tagreference/<int:id>", "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/user", "method": "GET", "auth_level": "public"},
        {"route": "/api/user", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/user/<int:id>", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/user/<string:username>", "method": "GET", "auth_level": "public"},
        {"route": "/api/user/getsuperusers", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/user/byschool/<int:school_id>", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/user/byschoolandexperiment/school_id/experiment_id", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/user/user/byproject/<int:project_id>", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/user/<int:id>", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/user/<int:id>", "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/variable/<int:id>", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/allVariables", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/variable/<int:id>", "method": "GET", "auth_level": "experiment_participant"},
        {"route": "/api/allVariables", "method": "GET", "auth_level": "experiment_participant"}
    ]

    for x in all_routes:
        if route == x['route'] and method == x['method']:
            auth_level = x['auth_level']
            if auth_level:
                break

    if auth_level == "sysadmin":
        sysadmin = current_user.is_sysadmin
        if not sysadmin:
            abort(403, 'This user does not have the proper level of authorisation to access this page')
        else:
            return True
    elif auth_level == "superuser":
        superuser = current_user.is_superuser
        if not superuser:
            abort(403, 'This user does not have the proper level of authorisation to access this page')
        else:
            return True
    elif auth_level == "experiment_participant":
        experiment_participant_exists = db.session.query(ExperimentParticipant). \
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
    elif auth_level == "school_user":
        school_user_exists = db.session.query(User). \
            filter_by(id=current_user.id, school_id=current_user.school_id). \
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










# def check_authorisation(current_user, authorisation_level):
#     if authorisation_level == "sysadmin":
#         sysadmin = current_user.is_sysadmin
#         if not sysadmin:
#             abort(403, 'This user does not have the proper level of authorisation to access this page')
#         else:
#             return True
#     elif authorisation_level == "superuser":
#         superuser = current_user.is_superuser
#         if not superuser:
#             abort(403, 'This user does not have the proper level of authorisation to access this page')
#         else:
#             return True
#     elif authorisation_level == "experiment_participant":
#         experiment_participant_exists = db.session.query(ExperimentParticipant). \
#             filter_by(user_id=current_user.id). \
#             first()
#         if experiment_participant_exists is not None:
#             return True
#         elif current_user.is_sysadmin:
#             return True
#         elif current_user.is_superuser:
#             return True
#         else:
#             abort(403, 'This user does not have the proper level of authorisation to access this page')
#     elif authorisation_level == "school_user":
#         school_user_exists = db.session.query(User). \
#             filter_by(id=current_user.id, school_id=current_user.school_id). \
#             first()
#         if school_user_exists is not None:
#             return True
#         elif current_user.is_sysadmin:
#             return True
#         elif current_user.is_superuser:
#             return True
#         else:
#             abort(403, 'This user does not have the proper level of authorisation to access this page')
#     else:
#         abort(403, 'This user does not have the proper level of authorisation to access this page')