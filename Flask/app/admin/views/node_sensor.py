from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Node_sensor
from app import db
from app.utils.functions import row2dict


@admin.route('/node_sensor', methods=['GET'])
def listNode_sensor():
    node_sensor = Node_sensor.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in node_sensor))


@admin.route('/node_sensor/add', methods=['GET', 'POST'])
def add_node_sensor():
    form = Node_sensorForm()
    if form.validate_on_submit():
        node_sensor = Node_sensor(name=form.name.data)
        try:
            db.session.add(node_sensor)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_node_sensor'))

    return render_template('admin/node_sensor.html',
                           form=form,
                           title="Add node_sensor")