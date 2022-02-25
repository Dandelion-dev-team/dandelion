from flask import render_template, url_for, redirect, abort
from flask_json import json_response
from app.admin import admin
from app.models import Report
from app import db
from app.utils.functions import row2dict


@admin.route('/report', methods=['GET'])
def listReport():
    report = Report.query.all()

    return json_response(data=(row2dict(x) for x in report))


@admin.route('/report/add', methods=['GET', 'POST'])
def add_report():
    form = ReportForm()
    if form.validate_on_submit():
        report = Report(name=form.name.data)
        try:
            db.session.add(report)
            db.session.commit()
        except Exception as e:
            db.session.rollback()
            abort(409, e.orig.msg)

        return redirect(url_for('admin.list_report'))

    return render_template('admin/report.html',
                           form=form,
                           title="Add report")

    return render_template('admin/report.html',
                           form=form,
                           report=report,
                           title='Edit report')
