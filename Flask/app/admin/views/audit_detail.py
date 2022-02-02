from flask import render_template, url_for, redirect
from flask_json import json_response
from app.admin import admin
from app.models import AuditDetail
from app import db
from app.utils.functions import row2dict


@admin.route('/audit_detail', methods=['GET'])
def listAudit_detail():
    audit_detail = AuditDetail.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in audit_detail))


@admin.route('/audit_detail/add', methods=['GET', 'POST'])
def add_audit_detail():
    form = Audit_detailForm()
    if form.validate_on_submit():
        audit_detail = AuditDetail(name=form.name.data)
        try:
            db.session.add(audit_detail)
            db.session.commit()
        except:
            db.session.rollback()

        return redirect(url_for('admin.list_audit_detail'))

    return render_template('admin/audit_detail.html',
                           form=form,
                           title="Add audit_detail")