import os

from flask import Flask, render_template, jsonify, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_json import FlaskJSON
import logging

# local imports
from config import app_config

db = SQLAlchemy()
logger = logging.getLogger()


def create_app(config_name):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(app_config[config_name])
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.config.from_pyfile('config.py')
    db.init_app(app)

    migrate = Migrate(app, db)

    from app import models

    if app.config['LOGLEVEL'] == 'DEBUG':
        level = logging.DEBUG
    elif app.config['LOGLEVEL'] == 'INFO':
        level = logging.INFO
    elif app.config['LOGLEVEL'] == 'WARNING':
        level = logging.WARNING
    elif app.config['LOGLEVEL'] == 'ERROR':
        level = logging.ERROR
    else:
        level = logging.NOTSET

    logging.basicConfig(filename=app.config['LOGFILE'],
                        level=level,
                        format='%(asctime)s %(levelname)s %(name)s %(threadName)s: %(message)s')

    from .public import public as public_blueprint
    app.register_blueprint(public_blueprint, url_prefix='/api')

    from .admin import admin as admin_blueprint
    app.register_blueprint(admin_blueprint, url_prefix='/api')

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/api')

    @app.errorhandler(400)
    def bad_request(error):
        return make_response(jsonify({'error': str(error)}), 400)

    @app.errorhandler(401)
    def unauthorised(error):
        return make_response(jsonify({'error': str(error)}), 401)

    @app.errorhandler(403)
    def forbidden(error):
        return make_response(jsonify({'error': 'You do not have sufficient permissions to access this page'}), 403)

    @app.errorhandler(404)
    def page_not_found(error):
        return make_response(jsonify({'error': "The page you're looking for doesn't exist"}), 404)

    @app.errorhandler(405)
    def method_not_allowed(error):
        return make_response(
            jsonify({'error': 'The server supports the method received, but the target resource does not.'}), 405)

    @app.errorhandler(409)
    def conflict(e):
        return make_response(jsonify(
            type=e.name,
            title="Database Error",
            status=e.code,
            message=e.description,
        ), 409)

    @app.errorhandler(500)
    def internal_server_error(error):
        return make_response(jsonify({'error': "The server encountered an internal error. That's all we know."}), 500)

    jwt = JWTManager(app)
    json = FlaskJSON(app)
    cors = CORS(app, resources={r"/api/*": {"origins": ["http://localhost:8000",
                                                        "http://localhost:443",
                                                        "http://127.0.0.1:8000",
                                                        "http://127.0.0.1:wq:443"]}},
                supports_credentials=True)

    return app
