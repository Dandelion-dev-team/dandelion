from app import db
from datetime import datetime


class Session(db.Model):
    __tablename__ = 'session'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'), nullable=False)
    login_timestamp = db.Column(db.DateTime)
    logout_timestamp = db.Column(db.DateTime)
    is_timed_out = db.Column(db.Boolean, default=False)



    def __repr__(self):
        return '{}'.format(self.name)
