from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import Audit
from app import db
from app.utils.functions import row2dict


@admin.route('/audit', methods=['GET'])
def listAudit():
    audit = Audit.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in audit))


@admin.route('/audit/add', methods=['GET', 'POST'])
def add_audit():
    form = AuditForm()
    if form.validate_on_submit():
        audit = Audit(name=form.name.data)
        try:
            db.session.add(audit)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_audit'))

    return render_template('admin/audit.html',
                           form=form,
                           title="Add audit")