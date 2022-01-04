from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Response
from app import db
from app.utils.functions import row2dict


@admin.route('/response', methods=['GET'])
def listResponse():
    response = Response.query.all()

    return json_response(data=(row2dict(x) for x in response))



@admin.route('/response/add', methods=['GET', 'POST'])
def add_response():
    form = ResponseForm()
    if form.validate_on_submit():
        response = Response(name=form.name.data)
        try:
            db.session.add(response)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_response'))

    return render_template('admin/response.html',
                           form=form,
                           title="Add response")




    return render_template('admin/response.html',
                           form=form,
                           response=response,
                           title='Edit response')


