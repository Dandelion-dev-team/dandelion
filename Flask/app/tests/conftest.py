import pytest
from flask_sqlalchemy import SQLAlchemy

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
            authority_id = authority.id,
            town = 'Edinburgh',
            postcode = 'EH1- 5DT',
            status = 'active'
        )
        db.session.add(school)
        db.session.commit()
        user = User(
            username = 'admin',
            password = 'admin',
            is_sysadmin = True,
            school_id = school.id
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
            status = 'active'
        )
        db.session.add(project)
        db.session.commit()
        project_partner = ProjectPartner(
            school_id = school.id,
            project_id = project.id,
            is_lead_partner = True,
            status = 'active'
        )
        db.session.add(project_partner)
        db.session.commit()
        node = Node(
            school_id = school.id,
            growcube_code = None,
            mac_address = "12:34:56:78:9A:BC",
            last_communication_date = None,
            next_communication_date = None,
            health_status = "green",
            status = 'active'
        )
        db.session.add(node)
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

