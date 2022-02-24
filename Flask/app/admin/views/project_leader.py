from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Project_leader
from app import db
from app.utils.functions import row2dict


@admin.route('/project_leader', methods=['GET'])
def listProject_leader():
    project_leader = Project_leader.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in project_leader))


@admin.route('/project_leader/add', methods=['GET', 'POST'])
def add_project_leader():
    form = Project_leaderForm()
    if form.validate_on_submit():
        project_leader = Project_leader(name=form.name.data)
        try:
            db.session.add(project_leader)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_project_leader'))

    return render_template('admin/project_leader.html',
                           form=form,
                           title="Add project_leader")