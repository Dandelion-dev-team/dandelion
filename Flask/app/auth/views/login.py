from flask import flash, redirect, render_template, url_for, request, make_response, jsonify, app, current_app
from flask_login import login_required, login_user, logout_user, current_user
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.testing import db
from werkzeug.security import check_password_hash
import jwt
import datetime
from app.admin.forms.users import UserForm
from app.auth import auth
from app.auth.forms.login import *
from app.models import User
from app import db
from app.auth.forms.password import PasswordForm
from flask import Flask
from flask import jsonify
from flask import request
from functools import wraps
from flask_jwt_extended import create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask_jwt_extended import get_jwt_identity


@auth.route('/login_without_cookies', methods=["POST"])
def login_without_cookies():
    access_token = create_access_token(identity=auth.username)
    return jsonify(access_token=access_token)


@auth.route('/login_with_cookies', methods=['POST'])
def login_with_cookies():
    response = jsonify({"msg": "login successful"})
    access_token = create_access_token(identity=auth.username)
    set_access_cookies(response, access_token)
    return response


@auth.route("/logout_with_cookies", methods=["POST"])
def logout_with_cookies():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response



@auth.route('/unprotected')
def unprotected():
    return jsonify({'message': 'Anyone can view this'})


@auth.route('/protected')
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': 'This is only available for people with valid tokens'})


@auth.route("/only_headers")
@jwt_required(locations=["headers"])
def only_headers():
    return jsonify(foo="baz")


@auth.route('/login')
def login():
    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('Could not verify - First Stage', 401,
                             {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = User.query.filter_by(username=auth.username).first()

    if not user:
        return make_response('Could not verify - Second stage', 401,
                             {'WWW-Authenticate': 'Basic realm="Login required!"'})

    if user.verify_password(auth.password):
        access_token = create_access_token(identity=auth.username)

        return jsonify({'access_token': access_token})

    return make_response('Could not verify Third Stage', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})


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

# def jwt_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = request.args.get('token')
#
#         if not token:
#             return jsonify({'message': 'Token is missing!'}), 403
#
#         try:
#             data = get_jwt_identity(current_user)  # I am not sure if this part does the validation
#         except:
#             return jsonify({'message': 'Token is invalid'}), 403
#
#         return f(*args, **kwargs)
#
#     return decorated


# Example code from https://www.bacancytechnology.com/blog/flask-jwt-authentication
#
# @app.route('/login', methods=['POST'])
# def login_user():
#     auth = request.authorization
#     if not auth or not auth.username or not auth.password:
#         return make_response('could not verify', 401, {'Authentication': 'login required"'})
#
#     user = Users.query.filter_by(name=auth.username).first()
#     if check_password_hash(user.password, auth.password):
#         token = jwt.encode(
#             {'public_id': user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=45)},
#             app.config['SECRET_KEY'], "HS256")
#
#         return jsonify({'token': token})
#
#     return make_response('could not verify', 401, {'Authentication': '"login required"'})

# @auth.route('/login', methods=['GET', 'POST'])
# def login():
#     form = LoginForm()
#     if form.validate_on_submit():
#
#         user = User.query.filter_by(username=form.username.data).first()
#         if user is not None and user.verify_password(form.password.data):
#             login_user(user)
#             return redirect(url_for('public.index'))
#         else:
#             flash('Invalid username or password.')
#
#     return render_template('form_page.html', form=form, title='Login')
