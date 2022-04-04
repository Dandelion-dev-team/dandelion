from flask import abort, make_response, redirect
from app.auth import auth
from app.models import User
from flask_cors import cross_origin

from flask import request
from flask_jwt_extended import create_access_token, jwt_required, set_access_cookies, unset_jwt_cookies, \
    create_refresh_token, set_refresh_cookies
import datetime


@auth.route('/user/login', methods=['POST'])
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def login():
    auth = request.authorization

    if not auth:
        abort(401, "No login details provided")

    if not auth.username:
        abort(401, "Missing username")

    if not auth.password:
        abort(401, "Missing password")

    user = User.query.filter_by(username=auth.username).first()

    if not user:
        abort(401, "Username not found")

    if user.verify_password(auth.password):
        access_token = create_access_token(identity=auth.username, expires_delta=None)
        refresh_token = create_refresh_token(identity=auth.username)
        resp = make_response(redirect(request.host_url, 200))
        resp.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        resp.headers.add('Access-Control-Allow-Headers', 'Authorization, Content-Type')

        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        return resp


    abort(401, "Invalid password")


# @auth.route('/password', methods=['GET', 'POST'])
# @jwt_required()
# def password():
#     user = current_user
#     form = PasswordForm()
#
#     if form.validate_on_submit():
#         user.password = form.password.data.encode('UTF8')
#         try:
#             db.session.commit()
#             flash('Password updated', 'success')
#             return redirect(url_for('public.index'))
#         except SQLAlchemyError as e:
#             db.session.rollback()
#             error = str(e.__dict__['orig'])
#             flash('{}'.format(error), 'error')
#         except Exception as e:
#             db.session.rollback()
#             flash('An error occurred - update failed', 'error')
#
#     return render_template('form_page.html',
#                            form=form,
#                            title='Change password')


# @auth.route('/logout')
# @jwt_required()
# def logout():
#     logout_user()
#     flash('You have successfully been logged out.')
#
#     return redirect(url_for('auth.login'))


# @auth.route('/login_without_cookies', methods=["POST"])
# def login_without_cookies():
#     access_token = create_access_token(identity=auth.username)
#     return access_token=access_token


@auth.route('/login_with_cookies', methods=['POST'])
def login_with_cookies():
    response = {"msg": "login successful"}
    access_token = create_access_token(identity=auth.username)
    set_access_cookies(response, access_token)
    return response


@auth.route("/logout_with_cookies", methods=["POST"])
def logout_with_cookies():
    response = {"msg": "logout successful"}
    unset_jwt_cookies(response)
    return response
