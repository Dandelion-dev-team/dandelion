from flask import Flask, render_template
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_json import FlaskJSON
from flask_bootstrap import Bootstrap
import logging


# local imports
from config import app_config

db = SQLAlchemy()

login_manager = LoginManager()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
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



    json = FlaskJSON(app)
    Bootstrap(app)


    return app