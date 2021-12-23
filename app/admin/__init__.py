from flask import Blueprint

admin = Blueprint('admin', __name__)

from .views.subject_group import *
from .views.quantity import *
from .views.authority import *
from .views.sensor import *