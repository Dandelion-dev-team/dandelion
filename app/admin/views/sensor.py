from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Sensor
from app import db
from app.utils.functions import row2dict


@admin.route('/sensor', methods=['GET'])
def listSensor():
    sensor = Sensor.query.all()

    return json_response(data=(row2dict(x) for x in sensor))



@admin.route('/sensor/add', methods=['GET', 'POST'])
def add_sensor():
    form = SensorForm()
    if form.validate_on_submit():
        sensor = Sensor(name=form.name.data)
        try:
            db.session.add(sensor)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_sensor'))

    return render_template('admin/sensor.html',
                           form=form,
                           title="Add sensor")




    return render_template('admin/sensor.html',
                           form=form,
                           sensor=sensor,
                           title='Edit subject sensor')


