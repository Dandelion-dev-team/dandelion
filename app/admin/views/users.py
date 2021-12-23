from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Users
from app import db
from app.utils.functions import row2dict


@admin.route('/users', methods=['GET'])
def listUsers():
    users = Users.query.all()

    return json_response(data=(row2dict(x) for x in users))



@admin.route('/users/add', methods=['GET', 'POST'])
def add_users():
    form = UsersForm()
    if form.validate_on_submit():
        users = Users(name=form.name.data)
        try:
            db.session.add(users)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_users'))

    return render_template('admin/users.html',
                           form=form,
                           title="Add users")




    return render_template('admin/users.html',
                           form=form,
                           users=users,
                           title='Edit subject users')


