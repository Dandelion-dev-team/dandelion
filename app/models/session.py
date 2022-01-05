from app import db
from datetime import datetime


class Session(db.Model):
    __tablename__ = 'session'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'), nullable=False)
    login_timestamp = db.Column(db.String)
    logout_timestamp = db.Column(db.String)
    is_timed_out = db.Column(db.Boolean, default=False)
    user = db.relationship('User', back_populates="user")



    def __repr__(self):
        return '{}'.format(self.name)
