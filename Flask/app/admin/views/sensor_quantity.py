from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Sensor_quantity
from app import db
from app.utils.functions import row2dict


@admin.route('/sensor_quantity', methods=['GET'])
def listSensor_quantity():
    sensor_quantity = Sensor_quantity.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in sensor_quantity))


@admin.route('/sensor_quantity/add', methods=['GET', 'POST'])
def add_sensor_quantity():
    form = Sensor_quantityForm()
    if form.validate_on_submit():
        sensor_quantity = Sensor_quantity(name=form.name.data)
        try:
            db.session.add(sensor_quantity)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_sensor_quantity'))

    return render_template('admin/sensor_quantity.html',
                           form=form,
                           title="Add sensor_quantity")