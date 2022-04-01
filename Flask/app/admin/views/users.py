from xml.dom import UserDataHandler
from flask import request, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect
from app.admin import admin
from app.models import User, ExperimentParticipant, Experiment, Project, School
from flask_cors import cross_origin
from app import db
from app.utils.functions import jwt_user
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete


@admin.route('/user', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def getAllUsers():
    users = User.query.all()
    output = []

    for user in users:
        user_data = {}
        user_data['username'] = user.username
        user_data['is_superuser'] = user.is_superuser
        user_data['status'] = user.status
        user_data['school_id'] = user.school_id
        output.append(user_data)

    return jsonify({'users': output})


@admin.route('/user', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def createUser():
    current_user = jwt_user(get_jwt_identity())
    data = request.get_json()
    user = User(
        username=data['username'],
        password=data['password'],
        school_id=data['school_id']
    )
    db.session.add(user)
    return_status = 200
    message = "New user has been created"

    try:
        db.session.commit()
        audit_create("users", user.id, current_user.id)
        return jsonify({"message": message, "id": user.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/user/<int:id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def getOneUser(id):
    user = User.query.get_or_404(id)

    user_data = {}
    user_data['username'] = user.username
    # user_data['password'] = user.password_hash
    user_data['school_id'] = user.school_id
    user_data['user_id'] = user.id

    return jsonify({'user': user_data})


@admin.route('/user/<string:username>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def getUserByUsername(username):
    # user = User.query.get_or_404(username)
    print(username)
    user = User.query.filter(User.username == username).first()

    user_data = {}
    user_data['user_id'] = user.id
    # user_data['password'] = user.password_hash
    user_data['school_id'] = user.school_id
    user_data['is_superuser'] = user.is_superuser
    user_data['is_sysadmin'] = user.is_sysadmin

    return user_data


@admin.route('/user/getsuperusers', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def getAllSuperUsers():
    # user = User.query.get_or_404(username)
    users = User.query.filter(User.is_superuser == True)
    output = []

    for user in users:
        user_data = {}
        user_data['username'] = user.username
        user_data['is_superuser'] = user.is_superuser
        user_data['status'] = user.status
        user_data['school_id'] = user.school_id
        output.append(user_data)

    return jsonify({'user': user_data})


@admin.route('/user/byschool/<int:school_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def getUsersBySchoolID(school_id):
    # user = User.query.get_or_404(username)
    users = User.query.filter(User.school_id == school_id)
    output = []

    for user in users:
        user_data = {}
        user_data['username'] = user.username
        user_data['status'] = user.status
        user_data['school_id'] = user.school_id
        output.append(user_data)

    return jsonify({'users': output})


@admin.route('/user/byschool/<int:school_id>/byexperiment/<int:experiment_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_users_by_school_and_experiment(school_id, experiment_id):
    users = User.query.join(ExperimentParticipant).join(Experiment).filter(User.school_id,
                                                                           ExperimentParticipant.experiment_id)

    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['status'] = user.status
        # user_data['is_participant'] =


@admin.route('/user/byproject/<int:project_id>', methods=['GET'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def get_user_by_project(project_id):
    users = User.query.join(ExperimentParticipant).join(Experiment).join(Project).join(School).filter(
        Project.id == project_id).all()

    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['status'] = user.status
        user_data['project_id'] = project_id

    return user_data


@admin.route('/user/<int:id>', methods=['GET', 'PUT'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def updateUser(id):
    current_user = jwt_user(get_jwt_identity())
    user_to_update = User.query.get_or_404(id)
    new_data = request.get_json()

    user_to_update.username = new_data['username']
    user_to_update.password = new_data['password']
    user_to_update.school_id = new_data['school_id']
    user_to_update.is_sysadmin = new_data['is_sysadmin']
    user_to_update.is_superuser = new_data['is_superuser']
    user_to_update.status = new_data['status']
    user_to_update.notes = new_data['notes']

    audit_details = prepare_audit_details(inspect(User), user_to_update, delete=False)

    message = "User has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("users", user_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/user/<int:id>', methods=['DELETE'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
@jwt_required()
def deleteUser(id):
    current_user = jwt_user(get_jwt_identity())
    user_to_delete = User.query.filter_by(id=id).first()
    if not user_to_delete:
        return jsonify({"message": "No user found!"})

    audit_details = prepare_audit_details(inspect(User), user_to_delete, delete=True)
    db.session.delete(user_to_delete)
    return_status = 200
    message = "The user has been deleted"

    try:
        db.session.commit()
        audit_delete("users", user_to_delete.id, audit_details, current_user.id)
        return jsonify({"message": message})

    except Exception as e:
        db.session.rollback()
        abort(409)

    # try:
    #     db.session.commit()
    #     audit_create("users", user.id, current_user.id)
    #     return jsonify({"message": message, "id": user.id})
    #
    # except Exception as e:
    #     db.session.rollback()
    #     abort(409, e.orig.msg)
