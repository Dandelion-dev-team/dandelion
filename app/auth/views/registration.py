from flask import flash, redirect, render_template, url_for, current_app, abort, session, request
from flask_login import login_required, login_user, logout_user, current_user
from flask_mail import Message, Mail
from datetime import datetime


from app.auth import auth
from .. import db
from app.models import Users
import logging
from ..forms.registration import RegistrationForm


@auth.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        users = Users(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            email=form.email.data,
            telephone=form.telephone.data,
            password=form.password.data,
        )

        db.session.add(users)
        db.session.commit()

        # redirect to the login page
        return redirect(url_for('auth.login'))

    # load registration template
    return render_template('/register.html', form=form, title='Register')