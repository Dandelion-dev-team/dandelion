from flask import Flask, render_template, jsonify, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_json import FlaskJSON
from flask_bootstrap import Bootstrap4
import logging



# local imports
from config import app_config

db = SQLAlchemy()

login_manager = LoginManager()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_pyfile('config.py')
    db.init_app(app)

    migrate = Migrate(app, db)

    from app import models

    login_manager.init_app(app)
    login_manager.login_message = "You must be logged in to access this page."
    login_manager.login_view = "auth.login"

    # logging.basicConfig(filename='<FlaskApp.log>',
    #                     level=app.config['LOGLEVEL'],
    #                     format='%(asctime)s %(levelname)s %(name)s %(threadName)s: %(message)s')



    from .public import public as public_blueprint
    app.register_blueprint(public_blueprint)

    from .admin import admin as admin_blueprint
    app.register_blueprint(admin_blueprint)

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    @app.errorhandler(400)
    def bad_request(error):
        return render_template(
            'error.html',
            title='Bad Request',
            errno=400,
            message='The server can’t return a response due to an error on the client’s end'
        ), 400

    @app.errorhandler(401)
    def unauthorised(error):
        """Return a 401 http status code"""
        return make_response(jsonify({'error': 'Not Found'}), 401)


    @app.errorhandler(403)
    def forbidden(error):
        return render_template(
            'error.html',
            title='Forbidden',
            errno=403,
            message='You do not have sufficient permissions to access this page'
        ), 403

    @app.errorhandler(404)
    def page_not_found(error):
        return render_template(
            'error.html',
            title='Page Not Found',
            errno=404,
            message="The page you're looking for doesn't exist"
        ), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return render_template(
            'error.html',
            title='Wrong Method',
            errno=405,
            message='The server supports the method received, but the target resource does not.'
        ), 405

    @app.errorhandler(409)
    def conflict(e):
        return jsonify(
            type = e.name,
            title="Database Error",
            status=e.code,
            message=e.description,
        ),409

    @app.errorhandler(500)
    def internal_server_error(error):
        return render_template(
            'error.html',
            title='Server Error',
            errno=500,
            message="The server encountered an internal error. That's all we know."
        ), 500

    jwt = JWTManager(app)
    json = FlaskJSON(app)
    cors = CORS(app)
    Bootstrap4(app)

    return app
