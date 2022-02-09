from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Project_partner
from app import db
from app.utils.functions import row2dict


@admin.route('/project_partner', methods=['GET'])
def listProject_partner():
    project_partner = Project_partner.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in project_partner))


@admin.route('/project_partner/add', methods=['GET', 'POST'])
def add_project_partner():
    form = Project_partnerForm()
    if form.validate_on_submit():
        project_partner = Project_partner(name=form.name.data)
        try:
            db.session.add(project_partner)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_project_partner'))

    return render_template('admin/project_partner.html',
                           form=form,
                           title="Add project_partner")