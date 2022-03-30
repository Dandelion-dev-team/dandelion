from app import db


class Status(db.Model):
    __tablename__ = 'status'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    domain = db.Column(db.String(30))
    is_default = db.Column(db.Boolean)
