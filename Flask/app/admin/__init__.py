from flask import Blueprint

admin = Blueprint('admin', __name__)

from .views.authority import *
from .views.condition import *
from .views.data import *
from .views.data_upload import *
from .views.experiment import *
from .views.experiment_participant import *
from .views.hypothesis import *
from .views.node import *
from .views.node_alert import *
from .views.node_sensor import *
from .views.observation import *
from .views.option import *
from .views.project import *
from .views.project_leader import *
from .views.project_partner import *
from .views.quantity import *
from .views.question import *
from .views.report import *
from .views.response import *
from .views.school import *
from .views.sensor import *
from .views.sensor_quantity import *
from .views.session import *
from .views.tag import *
from .views.tag_reference import *
from .views.users import *
from .views.variable import *
from .views.issue import *
