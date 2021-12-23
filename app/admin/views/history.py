from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import History

from app import db
from app.utils.functions import row2dict


@admin.route('/history', methods=['GET'])
def listHistory():
    history = History.query.all()

    return json_response(data=(row2dict(x) for x in history))



@admin.route('/history/add', methods=['GET', 'POST'])
def add_history():
    form = HistoryForm()
    if form.validate_on_submit():
        history = History(name=form.name.data)
        try:
            db.session.add(history)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_history'))

    return render_template('admin/history.html',
                           form=form,
                           title="Add history")




    return render_template('admin/history.html',
                           form=form,
                           history=history,
                           title='Edit subject history')


