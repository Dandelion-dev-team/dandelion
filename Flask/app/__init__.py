from flask import Flask, render_template
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_json import FlaskJSON
from flask_bootstrap import Bootstrap, Bootstrap4
import logging

# local imports
from config import app_config

db = SQLAlchemy()

login_manager = LoginManager()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    app.config['CORS_HEADERS'] = 'Content-Type'
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


