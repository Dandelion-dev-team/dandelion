from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Condition
from app import db
from app.utils.functions import row2dict


@admin.route('/condition', methods=['GET'])
def listCondition():
    condition = Condition.query.all()

    return json_response(data=(row2dict(x) for x in condition))



@admin.route('/condition/add', methods=['GET', 'POST'])
def add_condition():
    form = ConditionForm()
    if form.validate_on_submit():
        condition = Condition(name=form.name.data)
        try:
            db.session.add(condition)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_condition'))

    return render_template('admin/condition.html',
                           form=form,
                           title="Add condition")




    return render_template('admin/condition.html',
                           form=form,
                           condition=condition,
                           title='Edit condition')


