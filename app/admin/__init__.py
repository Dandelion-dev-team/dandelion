from flask import Blueprint

admin = Blueprint('admin', __name__)

from .views.subject_group import *