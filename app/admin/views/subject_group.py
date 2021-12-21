from flask import render_template, url_for, redirect
from app.admin import admin
from app.models import SubjectGroup
from app import db
from app.admin.forms.subject_group import *



@admin.route('/subject_group', methods=['GET'])
def list_subject_group():
    subject_group = SubjectGroup.query.all()
    return render_template('admin/subject_group.html',
                           rowdata=subject_group,
                           title='Subject Group')

@admin.route('/subject_group/add', methods=['GET', 'POST'])
def add_subject_group():
    form = SubjectGroupForm()
    if form.validate_on_submit():
        subject_group = SubjectGroup(name=form.name.data)
        try:
            db.session.add(subject_group)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_subject_group'))

    return render_template('subject_group.html',
                           form=form,
                           title="Add subject group")