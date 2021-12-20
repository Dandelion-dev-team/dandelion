import os

from app import create_app

config_name = os.getenv('FLASK_ENV')
app = create_app(config_name)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()