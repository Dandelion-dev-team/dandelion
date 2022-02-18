import json
from datetime import datetime
import flask
from flask import render_template, url_for, redirect, request, flash, current_app, jsonify, abort
from flask_json import json_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_login import login_required, current_user
from sqlalchemy import inspect
from sqlalchemy.exc import SQLAlchemyError
from app.admin import admin
from app.admin.forms.users import UserForm
from app.models import User, AuditDetail, Audit
from app import db
from app.utils.functions import jwt_user
import requests
# from app.admin.forms.users import *
from serialchemy import ModelSerializer
from app.utils.auditing import audit_create, prepare_audit_details, audit_update
from sqlalchemy.exc import SQLAlchemyError, IntegrityError


@admin.route('/user/create_new_user', methods=['POST'])
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
        # serialiser = ModelSerializer(User)
        return jsonify({"message": message, "id" : user.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)


@admin.route('/user', methods=['GET'])
def getAllUsers():
    users = User.query.all()
    output = []

    for user in users:
        user_data = {}
        user_data['username'] = user.username
        user_data['password'] = user.password_hash
        user_data['school_id'] = user.school_id
        output.append(user_data)

    return jsonify({'users': output})


@admin.route('/user/<username>', methods=['GET'])
def getOneUser(username):
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"message": "No user found"})

    user_data = {}
    user_data['username'] = user.username
    user_data['password'] = user.password_hash
    user_data['school_id'] = user.school_id

    return jsonify({'user': user_data})


@admin.route('/user/<int:id>', methods=['DELETE'])
def deleteUser(id):
    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({"message": "No user found!"})

    db.session.delete(user)
    return_status = 200
    message = "The user has been deleted"

    try:
        db.session.commit()
        audit_create("users", user.id, current_user.id)
        return jsonify({"message": message, "id": user.id})

    except Exception as e:
        db.session.rollback()
        abort(409, e.orig.msg)

    # db.session.commit()

    # return jsonify({"message": "The user has been deleted"})


@admin.route('/user/<int:id>', methods=['GET', 'PUT'])
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

    audit_details = prepare_audit_details(inspect(User), user_to_update)

    message = "User has been updated"

    if len(audit_details) > 0:
        try:
            db.session.commit()
            audit_update("users", user_to_update.id, audit_details, current_user.id)
            # serialiser = ModelSerializer(User)
            return jsonify({"message": message})

        except Exception as e:
            db.session.rollback()
            abort(409)

    # if not username:
    #     return jsonify({"message": "User not found!"})


# @admin.route('/create_user', methods=['GET', 'POST'])
# def testCreateUser():
#     form = UserForm()
#     if form.validate_on_submit():
#         data = json.dumps(dict(
#             username=form.username.data,
#             password=form.password.data,
#             school_id=form.school.data.id
#         ))
#
#         url = 'http://localhost:5000' + url_for('admin.createUser')
#
#         r = requests.post(url, json=data)
#         return r.content
#
#     return render_template('form_page.html', form=form)

# @admin.route('/user', methods=['GET'])
# def listUsers():
#     users = User.query.all()
#
#     return json_response(data=(row2dict(x) for x in users))
#
#
# @admin.route('/user', methods=['POST'])
# def createUser():
#     request_data = request.get_json()
#
#     print(request_data)
#
#     user = User(
#         school_id=request_data['school_id'],
#         username=request_data['username'],
#         password=request_data['password'],
#     )
#
#     try:
#         db.session.add(user)
#         db.session.commit()
#     except SQLAlchemyError as e:
#         db.session.rollback()
#         error = str(e.__dict__['orig'])
#     except:
#         db.session.rollback()
#         error = 'An error occurred - no record created'
#
#     return json_response(data=row2dict(user))
#
#
#
#
# @admin.route('/user/add', methods=['GET','POST'])
# def testCreateUser():
#     form = UsersForm()
#     if form.validate_on_submit():
#         r = requests.post('http://127.0.0.1:5000/user', json=dict(
#             school_id=form.school.data.id,
#             username=form.username.data,
#             password=form.password.data,
#         ))
#
#         return r
#
#     return render_template('form_page.html',
#                            form=form,
#                            title="Add User")


# -- Working Json Code to ADD a new user --

# @admin.route('/users/add', methods=['POST'])
# def add_users():
#     newSchool_id = request.form['school_id']
#     newUsername = request.form['username']
#     newPassword = request.form['password']
#     users = User(school_id = newSchool_id, username=newUsername, password=newPassword)
#     db.session.add(users)
#     db.session.commit()
#     return "<p> New User Created</p>"

# @admin.route('/users/add', methods=['GET', 'POST'])
# def add_users():
#     form = UsersForm()
#     if form.validate_on_submit():
#         users = Users(name=form.name.data)
#         try:
#             db.session.add(users)
#             db.session.commit()
#         except:
#             db.session.rollback()
#
#         return redirect(url_for('admin.list_users'))
#
#     return render_template('admin/users.html',
#                            form=form,
#                            title="Add users")


# return render_template('admin/users.html',
#                        form=form,
#                        users=users,
#                        title='Edit subject users')
