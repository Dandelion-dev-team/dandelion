from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Hypothesis
from app import db
from app.utils.functions import row2dict


@admin.route('/hypothesis', methods=['GET'])
def listHypothesis():
    hypothesis = Hypothesis.query.all()

    return json_response(data=(row2dict(x) for x in hypothesis))



@admin.route('/hypothesis/add', methods=['GET', 'POST'])
def add_hypothesis():
    form = HypothesisForm()
    if form.validate_on_submit():
        hypothesis = Hypothesis(name=form.name.data)
        try:
            db.session.add(hypothesis)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_hypothesis'))

    return render_template('admin/hypothesis.html',
                           form=form,
                           title="Add hypothesis")




    return render_template('admin/hypothesis.html',
                           form=form,
                           hypothesis=hypothesis,
                           title='Edit hypothesis')


