from flask import jsonify
from flask_cors import cross_origin
from app.public import public


@public.route('/')
@cross_origin(origin='http://127.0.0.1:8000/', supports_credentials='true')
def index():
    return jsonify({
        "message": "Welcome to Dandelion!"
    })
