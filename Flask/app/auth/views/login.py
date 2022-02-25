from flask import flash, redirect, render_template, url_for, request, make_response, jsonify, app, current_app
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.testing import db
from werkzeug.security import check_password_hash
import jwt
import datetime
from app.admin.forms.users import UserForm
from app.auth import auth
from app.models import User
from app import db
from app.auth.forms.password import PasswordForm
from flask import jsonify
from flask import request
from flask_jwt_extended import create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies
from flask_jwt_extended import get_jwt_identity



@auth.route('/user/login')
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
        access_token = create_access_token(identity=auth.username) #todo access_token documentation expiry time

        return jsonify({'access_token': access_token, "message" : "You are logged in"})

    return make_response('Could not verify Third Stage', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})



@auth.route('/password', methods=['GET', 'POST'])
@jwt_required()
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
@jwt_required()
def logout():
    logout_user()
    flash('You have successfully been logged out.')

    return redirect(url_for('auth.login'))


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

@auth.route("/only_headers")
@jwt_required(locations=["headers"])
def only_headers():
    return jsonify(foo="baz")

