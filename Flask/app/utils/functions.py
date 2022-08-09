import functools

from app import db
from app.models.users import User


def row2dict(row, summary=False):
    summary_columns = []
    if summary:
        try:
            summary_columns = row.summary_columns
        except:
            summary = False

    d = {}

    if summary:
        d = {label: (str(rgetattr(row, prop)) if rgetattr(row, prop) else '') for (label, prop) in summary_columns}
    elif len(row.__dict__.keys()) > 1:
        d = {prop: (str(rgetattr(row, prop)) if rgetattr(row, prop) else '') for prop in row.__dict__}
    else:
        d = {c.name: '' for c in row.__table__.columns}

    return d


def jwt_user(username):
    return User.query.filter(User.username == username).first()


# See https://python.tutorialink.com/getattr-and-setattr-on-nested-subobjects-chained-properties/
def rsetattr(obj, attr, val):
    pre, _, post = attr.rpartition('.')
    return setattr(rgetattr(obj, pre) if pre else obj, post, val)


def rgetattr(obj, attr, *args):
    def _getattr(obj, attr):
        return getattr(obj, attr, *args)

    return functools.reduce(_getattr, [obj] + attr.split('.'))


def is_username_taken(username):
    return db.session.query(db.exists().where(User.username == username)).scalar()

