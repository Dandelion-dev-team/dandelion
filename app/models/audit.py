from app import db
from datetime import datetime



class Audit(db.Model):
    __tablename__ = 'audit'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(60), unique=True, nullable=False)
    audit_date = db.Column(db.String)
    table_name = db.Column(db.String(100))
    primary_key_value = db.Column(db.Integer)

    @property
    def summary_columns(self):
        return ["id", "name"]

    def __repr__(self):
        return '{}'.format(self.name)