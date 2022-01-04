from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Option
from app import db
from app.utils.functions import row2dict


@admin.route('/option', methods=['GET'])
def listOption():
    option = Option.query.all()

    return json_response(data=(row2dict(x) for x in option))



@admin.route('/option/add', methods=['GET', 'POST'])
def add_option():
    form = OptionForm()
    if form.validate_on_submit():
        option = Option(name=form.name.data)
        try:
            db.session.add(option)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_option'))

    return render_template('admin/option.html',
                           form=form,
                           title="Add option")




    return render_template('admin/option.html',
                           form=form,
                           option=option,
                           title='Edit option')


