from flask import jsonify, abort
from flask_cors import cross_origin
from app.public import public
from logging import getLogger
logger = getLogger()


@public.route('/abort500')
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def abort500():
    logger.info('Aborting with status = 500')
    dummy = {}
    print(dummy["nothing"])
    abort(500, description = "Deliberate error")
