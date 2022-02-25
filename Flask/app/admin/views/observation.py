from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Observation
from app import db
from app.utils.functions import row2dict


@admin.route('/observation', methods=['GET'])
def listObservation ():
    observation = Observation .query.all()

    return json_response(data=(row2dict(x) for x in observation))



@admin.route('/observation/add', methods=['GET', 'POST'])
def add_observation():
    form = ObservationForm()
    if form.validate_on_submit():
        observation = Observation (name=form.name.data)
        try:
            db.session.add(observation)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_observation'))

    return render_template('admin/observation.html',
                           form=form,
                           title="Add observation")




    return render_template('admin/observation.html',
                           form=form,
                           observation=observation,
                           title='Edit observation')


