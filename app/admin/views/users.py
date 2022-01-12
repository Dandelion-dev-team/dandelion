from flask import render_template, url_for, redirect, request, flash
from flask_json import json_response
from sqlalchemy.exc import SQLAlchemyError

from app.admin import admin
from app.admin.forms.users import UsersForm
from app.models import Users
from app import db
from app.utils.functions import row2dict


# from app.admin.forms.users import *


@admin.route('/users', methods=['GET'])
def listUsers():
    users = Users.query.all()

    return json_response(data=(row2dict(x) for x in users))


@admin.route('/users/add', methods=['GET', 'POST'])

def add_users():
    form = UsersForm()
    if form.validate_on_submit():
        users = Users(
            school_id=form.school.data.id,
            username=form.username.data,
            password_hash=form.password_hash.data,

        )
        try:
            db.session.add(users)
            db.session.commit()
            flash('New user created', 'success')
        except SQLAlchemyError as e:
            db.session.rollback()
            error = str(e.__dict__['orig'])
            flash('{}'.format(error), 'error')
        except:
            db.session.rollback()
            flash('An error occurred - no record created', 'error')

        return redirect(url_for('admin.list_users'))

    return render_template('form_page.html',
                           form=form,
                           title="Add User")




# -- Working Json Code to ADD a new user --

# @admin.route('/users/add', methods=['POST'])
# def add_users():
#     newSchool_id = request.form['school_id']
#     newUsername = request.form['username']
#     newPassword = request.form['password']
#     users = Users(school_id = newSchool_id, username=newUsername, password=newPassword)
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
