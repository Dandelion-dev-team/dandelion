import pytest
from app import create_app
from app.models import *


@pytest.fixture()
def app():
    app = create_app('production')
    app.config.update({
        "TESTING": True,
        "SQLALCHEMY_DATABASE_URI": 'mysql+mysqlconnector://test_user:test@localhost/test_db'
    })

    with app.app_context():
        db.drop_all()
        db.create_all()
        db.session.commit()
        authority = Authority(
            name = 'Dandelion'
        )
        db.session.add(authority)
        db.session.commit()
        school = School(
            name = 'Dandelion',
            authority_id = authority.id
        )
        db.session.add(school)
        db.session.commit()
        user = User(
            username = 'admin',
            password = 'admin',
            is_sysadmin = True
        )
        db.session.add(user)
        db.session.commit()
        project = Project(
            title = 'Thigmomorphogenesis',
            description = 'Tickling plants',
            project_image_link = "",
            project_text = "No text",
            start_date = datetime.now(),
            end_date = datetime.now(),
            status = 'A'
        )
        db.session.add(project)
        db.session.commit()

    # other setup can go here

    yield app

    # clean up / reset resources here

    with app.app_context():
        db.session.remove()
        db.drop_all()


@pytest.fixture()
def client(app):
    ctx = app.test_request_context()
    ctx.push()
    yield app.test_client()


