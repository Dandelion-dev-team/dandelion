from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Node_alert
from app import db
from app.utils.functions import row2dict


@admin.route('/node_alert', methods=['GET'])
def listNode_alert():
    node_alert = Node_alert.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in node_alert))


@admin.route('/node_alert/add', methods=['GET', 'POST'])
def add_node_alert():
    form = Node_alertForm()
    if form.validate_on_submit():
        node_alert = Node_alert(name=form.name.data)
        try:
            db.session.add(node_alert)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_node_alert'))

    return render_template('admin/node_alert.html',
                           form=form,
                           title="Add node_alert")