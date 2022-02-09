from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Project
from app import db
from app.utils.functions import row2dict


@admin.route('/project', methods=['GET'])
def listProject():
    project = Project.query.all()

    return json_response(data=(row2dict(x,summary=True) for x in project))



@admin.route('/project/add', methods=['GET', 'POST'])
def add_project():
    form = ProjectForm()
    if form.validate_on_submit():
        project = Project(name=form.name.data)
        try:
            db.session.add(project)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_project'))

    return render_template('admin/project.html',
                           form=form,
                           title="Add project")




    return render_template('admin/project.html',
                           form=form,
                           project=project,
                           title='Edit project')


