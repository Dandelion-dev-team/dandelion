from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Experiment_participant
from app import db
from app.utils.functions import row2dict


@admin.route('/experiment_participant', methods=['GET'])
def listExperiment_participant():
    experiment_participant = Experiment_participant.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in experiment_participant))


@admin.route('/experiment_participant/add', methods=['GET', 'POST'])
def add_experiment_participant():
    form = Experiment_participantForm()
    if form.validate_on_submit():
        experiment_participant = Experiment_participant(name=form.name.data)
        try:
            db.session.add(experiment_participant)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_experiment_participant'))

    return render_template('admin/experiment_participant.html',
                           form=form,
                           title="Add experiment_participant")