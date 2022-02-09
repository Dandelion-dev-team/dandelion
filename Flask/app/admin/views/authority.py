from flask import render_template, url_for, redirect, request
from flask_json import json_response
from app.admin import admin
from app.admin.forms.authority import AuthorityForm
from app.models import Authority
from app import db
from app.utils.functions import row2dict


@admin.route('/authority', methods=['GET'])
def listAuthority():
    authority = Authority.query.all()

    return json_response(data=(row2dict(x, summary=True) for x in authority))


@admin.route('/authority/add', methods=['POST'])
def add_authority():
    newName = request.form['name']
    newTelephone = request.form['telephone']
    newEmail = request.form['email']
    authority = Authority(name=newName, telephone=newTelephone, email=newEmail)
    db.session.add(authority)
    db.session.commit()
    return "<p>Data is Updated</p>"








