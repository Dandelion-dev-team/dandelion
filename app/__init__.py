from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_json import FlaskJSON

# local imports
from config import app_config

db = SQLAlchemy()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    #app.config.from_object(app_config[config_name])
    app.config.from_pyfile('config.py')
    db.init_app(app)

    migrate = Migrate(app, db)
    from app import models

    from .public import public as public_blueprint
    app.register_blueprint(public_blueprint)

    from .admin import admin as admin_blueprint
    app.register_blueprint(admin_blueprint)

    json = FlaskJSON(app)

    return app