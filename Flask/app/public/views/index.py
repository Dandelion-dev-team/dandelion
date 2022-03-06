from flask import jsonify
from flask_cors import cross_origin
from app.public import public


@public.route('/')
@cross_origin()
def index():
    return jsonify({
        "message": "Welcome to Dandelion!"
    })
