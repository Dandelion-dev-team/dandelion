from flask import render_template
from app.public import public


@public.route('/')
def index():
    return render_template('index.html',
                           title="Dandelion Flask",
                           content="Welcome to the Dandelion Flask App")