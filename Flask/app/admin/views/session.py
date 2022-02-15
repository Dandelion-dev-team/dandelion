from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Session
from app import db
from app.utils.functions import row2dict


@admin.route('/session', methods=['GET'])
def listSession():
    session = Session.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in session))


@admin.route('/session/add', methods=['GET', 'POST'])
def add_session():
    form = SessionForm()
    if form.validate_on_submit():
        session = Session(name=form.name.data)
        try:
            db.session.add(session)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_session'))

    return render_template('admin/session.html',
                           form=form,
                           title="Add session")