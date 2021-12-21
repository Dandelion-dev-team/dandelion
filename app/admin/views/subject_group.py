from flask import render_template, url_for, redirect
from flask_json import json_response

from app.admin import admin
from app.models import SubjectGroup
from app import db
from app.admin.forms.subject_group import *


@admin.route('/subject_groups', methods=['GET'])
def list_subject_groups():
    subject_groups = SubjectGroup.query.all()
    return render_template('admin/subject_groups.html',
                           rowdata=subject_groups,
                           title='Subject Groups')


@admin.route('/subject_groups/add', methods=['GET', 'POST'])
def add_subject_group():
    form = SubjectGroupForm()
    if form.validate_on_submit():
        subject_group = SubjectGroup(name=form.name.data)
        try:
            db.session.add(subject_group)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_subject_groups'))

    return render_template('admin/subject_group.html',
                           form=form,
                           title="Add subject group")


@admin.route('/subject_group/delete/<int:id>', methods=['GET', 'POST'])
def delete_subject_group(id):
    subject_group = SubjectGroup.query.get_or_404(id)
    db.session.delete(subject_group)
    db.session.commit()

    return redirect(url_for('admin.list_subject_groups'))


@admin.route('/subject_group/edit/<int:id>', methods=['GET', 'POST'])
def edit_subject_group(id):
    subject_group = SubjectGroup.query.get_or_404(id)
    form = SubjectGroupForm(obj=subject_group)

    if form.validate_on_submit():
        subject_group.name = form.name.data
        db.session.commit()
        return redirect(url_for('admin.list_subject_groups'))

    return render_template('admin/subject_group.html',
                           form=form,
                           subject_group=subject_group,
                           title='Edit subject group')


# ~~TESTING~~

# @admin.route('/subject_groups', methods=['GET'])
# def list_subject_groups():
#     subject_groups = SubjectGroup.query.all()
#     return json_response(
#  id= 0,
#  name= "string",
#  unit= "string",
#  help_url= "string"
#  )
# return render_template('admin/subject_groups.html',
#                        rowdata=subject_groups,
#                        title='Subject Groups')
