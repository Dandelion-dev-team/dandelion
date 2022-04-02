from flask import jsonify
from flask_cors import cross_origin
from app.public import public
from logging import getLogger
logger = getLogger()


@public.route('/')
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def index():
    logger.info('Call to index')
    return jsonify({
        "message": "Welcome to Dandelion!"
    })
