from flask import Blueprint

public = Blueprint('public', __name__)

from .views.index import *
from .views.abort_500 import *
