from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Tag_reference
from app import db
from app.utils.functions import row2dict


@admin.route('/tag_reference', methods=['GET'])
def listTag_reference():
    tag_reference = Tag_reference.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in tag_reference))


@admin.route('/tag_reference/add', methods=['GET', 'POST'])
def add_tag_reference():
    form = Tag_referenceForm()
    if form.validate_on_submit():
        tag_reference = Tag_reference(name=form.name.data)
        try:
            db.session.add(tag_reference)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_tag_reference'))

    return render_template('admin/tag_reference.html',
                           form=form,
                           title="Add tag_reference")