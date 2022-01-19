from flask import flash, redirect, render_template, url_for
from flask_login import login_required, login_user, logout_user, current_user
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.testing import db
from app.admin.forms.users import UserForm
from app.auth import auth
from app.auth.forms.login import *
from app.models import User
from app import db
from app.auth.forms.password import PasswordForm


@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():

        user = User.query.filter_by(username=form.username.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
            return redirect(url_for('public.index'))
        else:
            flash('Invalid username or password.')

    return render_template('form_page.html', form=form, title='Login')


@auth.route('/password', methods=['GET', 'POST'])
@login_required
def password():
    user = current_user
    form = PasswordForm()

    if form.validate_on_submit():
        user.password = form.password.data.encode('UTF8')
        try:
            db.session.commit()
            flash('Password updated', 'success')
            return redirect(url_for('public.index'))
        except SQLAlchemyError as e:
            db.session.rollback()
            error = str(e.__dict__['orig'])
            flash('{}'.format(error), 'error')
        except Exception as e:
            db.session.rollback()
            flash('An error occurred - update failed', 'error')

    return render_template('form_page.html',
                           form=form,
                           title='Change password')


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have successfully been logged out.')

    return redirect(url_for('auth.login'))
