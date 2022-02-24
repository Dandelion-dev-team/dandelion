from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Tag
from app import db
from app.utils.functions import row2dict


@admin.route('/experiment', methods=['GET'])
def listTag():
    experiment = Tag.query.all()

    return json_response(data=(row2dict(x) for x in experiment))



@admin.route('/tag/add', methods=['GET', 'POST'])
def add_tag():
    form = TagForm()
    if form.validate_on_submit():
        tag = Tag(name=form.name.data)
        try:
            db.session.add(tag)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_tag'))

    return render_template('admin/tag.html',
                           form=form,
                           title="Add tag")




    return render_template('admin/tag.html',
                           form=form,
                           tag=tag,
                           title='Edit tag')


