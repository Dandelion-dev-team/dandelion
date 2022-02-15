from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import School
from app import db
from app.utils.functions import row2dict


@admin.route('/school', methods=['GET'])
def listSchool():
    school = School.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in school))


@admin.route('/school/add', methods=['GET', 'POST'])
def add_school():
    form = SchoolForm()
    if form.validate_on_submit():
        school = School(name=form.name.data)
        try:
            db.session.add(school)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)


        return redirect(url_for('admin.list_school'))

    return render_template('admin/school.html',
                           form=form,
                           title="Add school")