from flask import Blueprint

admin = Blueprint('admin', __name__)

from .views.subject_group import *
from .views.quantity import *
from .views.authority import *
from .views.sensor import *
from .views.node import *
from .views.users import *
from .views.experiment import *
from .views.observation import *
from .views.project import *
from .views.tag import *
