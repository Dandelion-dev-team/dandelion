from flask import render_template
from app.public import public
from flask_cors import CORS, cross_origin


@public.route('/')
@cross_origin()
def index():
    return render_template('index.html',
                           title="Dandelion Flask",
                           content="Welcome to the Dandelion Flask App")