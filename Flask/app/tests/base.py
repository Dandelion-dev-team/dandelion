from flask_testing import TestCase
from app import create_app
from app.models import *

class TestBase(TestCase):

 app_root = '/home/notis/PycharmProjects/dandelion_app/app/'

 def create_app(self):

   # pass in test configurations
  config_name = 'development'
  app = create_app(config_name)
  app.config.update(
  SQLALCHEMY_DATABASE_URI='mysql+mysqlconnector://super_admin1:DandelionSA2022@localhost/dandelion_db1',
  WTF_CSRF_ENABLED = False
  )
  return app

 def setUp(self):
  pass

 def tearDown(self):
  pass