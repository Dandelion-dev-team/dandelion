from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Variable
from app import db
from app.utils.functions import row2dict


@admin.route('/variable', methods=['GET'])
def listVariable():
    variable = Variable.query.all()

    return json_response(data=(row2dict(x) for x in variable))



@admin.route('/variable/add', methods=['GET', 'POST'])
def add_variable():
    form = VariableForm()
    if form.validate_on_submit():
        variable = Variable(name=form.name.data)
        try:
            db.session.add(variable)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_variable'))

    return render_template('admin/variable.html',
                           form=form,
                           title="Add variable")




    return render_template('admin/variable.html',
                           form=form,
                           variable=variable,
                           title='Edit variable')


