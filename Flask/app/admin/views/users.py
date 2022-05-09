import random
from random import randint
from xml.dom import UserDataHandler
from flask import request, jsonify, abort
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import inspect, and_

from app.admin import admin
from app.admin.views.school import getOneSchool
from app.models import User, ExperimentParticipant, Experiment, Project, School, ProjectPartner
from app import db
from app.utils.functions import jwt_user, is_username_taken
from app.utils.authorisation import auth_check
from app.utils.auditing import audit_create, prepare_audit_details, audit_update, audit_delete


@admin.route('/user', methods=['GET'])
@jwt_required()
def getAllUsers():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
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
@jwt_required()
def createUser():
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user)
    data = request.get_json()
    user = User(
        username=data['username'],
        password=data['password'],
        school_id=data['school_id'],
        is_superuser=data['is_superuser'],
        is_sysadmin=data['is_sysadmin'],
        status=data['status']
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
@jwt_required()
def getOneUser(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    user = User.query.get_or_404(id)

    user_data = {}
    user_data['username'] = user.username
    user_data['school_id'] = user.school_id
    user_data['user_id'] = user.id

    return jsonify({'user': user_data})


@admin.route('/user/<string:username>', methods=['GET'])
def getUserByUsername(username):
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
@jwt_required()
def getAllSuperUsers():
    # current_user = jwt_user(get_jwt_identity())
    # authorised = auth_check(request.path, request.method, current_user)
    users = User.query.filter(User.is_superuser == True).all()
    output = []

    for user in users:
        user_data = {}
        user_data['username'] = user.username
        user_data['is_superuser'] = user.is_superuser
        user_data['status'] = user.status
        user_data['school_id'] = user.school_id
        output.append(user_data)

    return jsonify({'user': output})


@admin.route('/user/byschool/<int:school_id>', methods=['GET'])
@jwt_required()
def getUsersBySchoolID(school_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, school_id)
    users = User.query.filter(User.school_id == school_id)
    output = []

    for user in users:
        user_data = {}
        user_data['username'] = user.username
        user_data['status'] = user.status
        user_data['school_id'] = user.school_id
        user_data['user_id'] = user.id
        user_data['notes'] = user.notes
        output.append(user_data)

    return jsonify({'users': output})


@admin.route('/user/byschoolandexperiment/<int:school_id>/<int:experiment_id>', methods=['GET'])
@jwt_required()
def get_users_by_school_and_experiment(school_id, experiment_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, school_id, experiment_id)

    users = User.query. \
        join(School). \
        outerjoin(ExperimentParticipant,
                  and_(User.id == ExperimentParticipant.user_id, ExperimentParticipant.experiment_id == experiment_id)). \
        outerjoin(Experiment). \
        filter(User.school_id == school_id). \
        with_entities(User.id,
                      User.username,
                      User.status,
                      User.school_id,
                      ExperimentParticipant.experiment_id). \
        all()

    output = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['status'] = user.status
        user_data['school_id'] = user.school_id
        user_data['is_participant'] = True if user.experiment_id else False
        output.append(user_data)

    return jsonify({'users': output})  # If I don't use jsonify, I get only the last entry


@admin.route('/user/byproject/<int:project_id>', methods=['GET'])
@jwt_required()
def get_user_by_project(project_id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, project_id)
    users = User.query.join(ExperimentParticipant).join(Experiment).join(Project).join(School).filter(
        Project.id == project_id).all()

    output = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        user_data['school_id'] = user.school_id  # <-- it returns school_id instead of school name
        user_data['status'] = user.status
        output.append(user_data)

    return jsonify({'users': output})


@admin.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
def updateUser(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
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

    try:
        db.session.commit()
        audit_update("users", user_to_update.id, audit_details, current_user.id)
        return jsonify({"message": message})

    except Exception as e:
        db.session.rollback()
        abort(409)


@admin.route('/user/reset/<int:id>', methods=['PUT'])
@jwt_required()
def passwordReset(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
    user_to_update = User.query.get_or_404(id)
    new_data = request.get_json()

    user_to_update.password = new_data['password']

    audit_details = prepare_audit_details(inspect(User), user_to_update, delete=False)

    message = "Password has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("users", user_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/user/access/<int:id>', methods=['PUT'])
def updatePassword(id):
    user_to_update = User.query.get_or_404(id)
    new_data = request.get_json()
    user_to_update.password = new_data['password']

    audit_details = prepare_audit_details(inspect(User), user_to_update, delete=False)

    message = "Password updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("users", user_to_update.id, audit_details, id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)


@admin.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
def deleteUser(id):
    current_user = jwt_user(get_jwt_identity())
    authorised = auth_check(request.path, request.method, current_user, id)
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


@admin.route('/user/create_account/multiple', methods=['POST'])
@jwt_required()
def create_multiple_accounts():
    current_user = jwt_user(get_jwt_identity())
    multiple_accounts = request.get_json()
    school_id = multiple_accounts['school_id']
    school = School.query.filter(School.id == school_id).with_entities(School.name).first()
    school_name = school.name
    animal_list = ['Panda', 'Giraffe', 'Rabbit', 'Fox', 'Elephant', 'Hamster', 'Turtle', 'Lion', 'Bee', 'Dolphin',
                   'Frog', 'Penguin', 'Pony', 'Horse', 'Donkey', 'Duck', 'Kangaroo']
    accounts_number = multiple_accounts['accounts_number']
    school_first_word = school_name.split()[0]

    for i in range(accounts_number):
        animal = random.choice(animal_list)
        number = str(randint(10, 999))
        user = User(
            username=str(school_first_word + animal + number),
            password=str(school_first_word + animal + number),
            school_id=multiple_accounts['school_id'],
            is_superuser=False,
            is_sysadmin=False,
            status="unallocated"
        )

        if is_username_taken(user.username):

            username_exists = True

            while username_exists:
                number = int(number)

                if 10 <= number < 999:
                    number = number + 1
                elif number == 999:
                    number = number - 980
                number = str(number)
                animal = random.choice(animal_list)
                user.username = str(school_first_word + animal + number)

                if is_username_taken(user.username):
                    username_exists = True
                else:
                    username_exists = False

        db.session.add(user)

        try:
            db.session.commit()
            audit_create("users", user.id, current_user.id)

        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

    message = "Multiple user accounts have been created"

    return {"message": message, "number of accounts created": accounts_number}


@admin.route('/user/updatestatus/<int:id>',
             methods=['PUT'])  # Updates the new user account status from unallocated to active
@jwt_required()
def updateUserStatus(id):
    current_user = jwt_user(get_jwt_identity())
    user_status_to_update = User.query.get_or_404(id)
    new_data = request.get_json()

    if user_status_to_update.status == 'unallocated':
        if new_data['status'] == 'active':
            user_status_to_update.status = new_data['status']

    audit_details = prepare_audit_details(inspect(User), user_status_to_update, delete=False)

    message = "User status has been updated from unallocated to active, now they can and should update their password"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("users", user_status_to_update.id, audit_details, current_user.id)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)
