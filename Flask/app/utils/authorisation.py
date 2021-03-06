from flask import abort, request
from app import db
from app.models import ExperimentParticipant, User


def auth_check(route, method, current_user=None, id_1=None, id_2=None):
    id_1 = str(id_1)
    id_2 = str(id_2)

    all_routes = [
        {"route": "/api/authority", "method": "GET", "auth_level": "public"},
        {"route": "/api/authority", "method": "POST", "auth_level": "sysadmin"},
        {"route": "/api/authority/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/authority/" + id_1, "method": "PUT", "auth_level": "sysadmin"},
        {"route": "/api/authority/" + id_1, "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/condition", "method": "GET", "auth_level": "public"},
        {"route": "/api/experiment/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/project/" + id_1 + "/experiment", "method": "GET", "auth_level": "public"},
        {"route": "/api/experiment/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/experiment/filtered/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/experiment", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/experiment/" + id_1 + "/uploadImage", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/experiment/" + id_1 + "/uploadImage", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/experiment/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/experiment_participant", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/experiment_participant/add", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/experiment_participant/" + id_1, "method": "GET", "auth_level": "superuser"},
        {"route": "/api/experiment_participant/" + id_1 + "/" + id_2, "method": "POST", "auth_level": "superuser"},
        {"route": "/api/experiment_participant/updatestatus/" + id_1, "method": "PUT",
         "auth_level": "superuser"},
        {"route": "/api/experiment_participant/delete/" + id_1, "method": "DELETE",
         "auth_level": "superuser"},
        {"route": "/api/hypothesis", "method": "GET", "auth_level": "public"},
        {"route": "/api/issue", "method": "GET", "auth_level": "public"},
        {"route": "/api/issue/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/issue", "method": "POST", "auth_level": "school_user"},
        {"route": "/api/issue/" + id_1, "method": "PUT", "auth_level": "school_user"},
        {"route": "/api/issue/note/" + id_1, "method": "PUT", "auth_level": "school_user"},
        {"route": "/api/issue/close/" + id_1, "method": "PUT", "auth_level": "sysadmin"},
        {"route": "/api/issue/" + id_1 + "/upload_image", "method": "POST", "auth_level": "school_user"},
        {"route": "/api/node", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node/byschool/" + id_1, "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/node/" + id_1, "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/node/" + id_1, "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/node/" + id_1 + "/uploaddata", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/node/register/" + id_1, "method": "POST", "auth_level": "superuser"},
        {"route": "/api/node/latest/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/node_sensor", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node_alert", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node_alert/active_alerts", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/node_alert/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/node_sensor", "method": "GET", "auth_level": "superuser"},
        {"route": "/api/observation", "method": "GET", "auth_level": "public"},
        {"route": "/api/observation/" + id_1 + "/uploadImage", "method": "POST", "auth_level": "experiment_participant"},
        {"route": "/api/observation", "method": "POST", "auth_level": "experiment_participant"},
        {"route": "/api/observation/multiple", "method": "POST", "auth_level": "experiment_participant"},
        {"route": "/api/observation/" + id_1, "method": "PUT", "auth_level": "experiment_participant"},
        {"route": "/api/observation/update/" + id_1, "method": "PUT", "auth_level": "experiment_participant"},
        {"route": "/api/observation/byuser/" + id_1, "method": "GET", "auth_level": "experiment_participant"},
        {"route": "/api/observation/delete/" + id_1, "method": "DELETE", "auth_level": "experiment_participant"},
        {"route": "/api/project", "method": "GET", "auth_level": "public"},
        {"route": "/api/project/all", "method": "GET", "auth_level": "public"},
        {"route": "/api/project", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/project/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/project/" + id_1, "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/project/" + id_1 + "/uploadImage", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project/" + id_1 + "/uploadImage", "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/project_leader", "method": "GET", "auth_level": "public"},
        {"route": "/api/project_leader", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project_leader" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/project_leader/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/project_leader/" + id_1, "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/project_partner", "method": "GET", "auth_level": "public"},
        {"route": "/api/project_partner", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project_partner/" + id_1 + "/" + id_2, "method": "POST", "auth_level": "superuser"},
        {"route": "/api/project_partner/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/project_partner/invitation_details/" + id_1, "method": "GET",
         "auth_level": "superuser"},
        {"route": "/api/project_partner/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/project_partner/update_invitation/" + id_1, "method": "PUT",
         "auth_level": "superuser"},
        {"route": "/api/project_partner/" + id_1, "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/quantity", "method": "GET", "auth_level": "public"},
        {"route": "/api/quantity", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/quantity/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/quantity/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/quantity/" + id_1, "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/report", "method": "GET", "auth_level": "public"},
        {"route": "/api/response", "method": "GET", "auth_level": "school_user"},
        {"route": "/api/school", "method": "GET", "auth_level": "public"},
        {"route": "/api/school", "method": "POST", "auth_level": "sysadmin"},
        {"route": "/api/school/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/school/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/school/" + id_1, "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/school/" + id_1 + "/uploadImage", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/sensor", "method": "GET", "auth_level": "public"},
        {"route": "/api/sensor", "method": "POST", "auth_level": "sysadmin"},
        {"route": "/api/sensor/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/sensor/" + id_1, "method": "PUT", "auth_level": "sysadmin"},
        {"route": "/api/sensor/" + id_1, "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/sensorQuantity", "method": "POST", "auth_level": "sysadmin"},
        {"route": "/api/sensorQuantity/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/sensorQuantity/" + id_1, "method": "PUT", "auth_level": "sysadmin"},
        {"route": "/api/sensorQuantity/" + id_1, "method": "DELETE", "auth_level": "sysadmin"},
        {"route": "/api/session", "method": "GET", "auth_level": "sysadmin"},
        {"route": "/api/tagreference", "method": "GET", "auth_level": "public"},
        {"route": "/api/tagreference", "method": "POST", "auth_level": "experiment_participant"},
        {"route": "/api/tagreference/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/tagreference/" + id_1, "method": "PUT", "auth_level": "superuser"},
        {"route": "/api/tagreference/" + id_1, "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/user", "method": "GET", "auth_level": "school_user"},
        {"route": "/api/user", "method": "POST", "auth_level": "superuser"},
        {"route": "/api/user/" + id_1, "method": "GET", "auth_level": "school_user"},
        {"route": "/api/user/" + id_1, "method": "GET", "auth_level": "school_user"},
        {"route": "/api/user/reset/" + id_1, "method": "PUT", "auth_level": "school_user"},
        {"route": "/api/user/getsuperusers", "method": "GET", "auth_level": "sysadmin"},
        {"route": "/api/user/byschool/" + id_1, "method": "GET", "auth_level": "superuser"},
        {"route": "/api/user/byschoolandexperiment/" + id_1 + "/" + id_2, "method": "GET",
         "auth_level": "superuser"},
        {"route": "/api/user/byproject/" + id_1, "method": "GET", "auth_level": "superuser"},
        {"route": "/api/user/" + id_1, "method": "PUT", "auth_level": "school_user"},
        {"route": "/api/user/" + id_1, "method": "DELETE", "auth_level": "superuser"},
        {"route": "/api/variable/" + id_1, "method": "GET", "auth_level": "public"},
        {"route": "/api/allVariables", "method": "GET", "auth_level": "public"},
        {"route": "/api/discreteVariable", "method": "GET", "auth_level": "public"}
    ]

    auth_level = "not found"

    for x in all_routes:
        if route == x['route'] and method == x['method']:
            auth_level = x['auth_level']
            if auth_level:
                break

    if auth_level == "not found":
        abort(403, 'Could not check permission for this page')

    if auth_level == "sysadmin":
        if current_user.is_sysadmin:
            return True

    elif auth_level == "superuser":
        if current_user.is_sysadmin or current_user.is_superuser:
            return True

    elif auth_level == "experiment_participant":
        experiment_participant_exists = db.session.query(ExperimentParticipant). \
            filter_by(user_id=current_user.id). \
            first()
        if experiment_participant_exists is not None or \
                current_user.is_sysadmin or \
                current_user.is_superuser:
            return True

    elif auth_level == "school_user":
        school_user_exists = db.session.query(User). \
            filter_by(id=current_user.id, school_id=current_user.school_id). \
            first()
        if school_user_exists is not None or \
            current_user.is_sysadmin or \
            current_user.is_superuser:
            return True

    abort(403, 'You do not have permission to access this page')
