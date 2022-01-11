from flask import Blueprint

admin = Blueprint('admin', __name__)

from .views.quantity import *
from .views.authority import *
from .views.sensor import *
from .views.node import *
from .views.users import *
from .views.experiment import *
from .views.observation import *
from .views.project import *
from .views.tag import *
from .views.hypothesis import *
from .views.report import *
from .views.sensor import *
from .views.variable import *
from .views.node_alert import *
from .views.node_sensor import *
from .views.project_leader import *
from .views.school import *
from .views.sensor_quantity import *
from .views.session import *
from .views.tag_reference import *
from .views.audit import *
from .views.audit_detail import *
from .views.experiment_participant import *
from .views.project_partner import *

