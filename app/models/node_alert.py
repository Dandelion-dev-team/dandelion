from app import db
from datetime import datetime


class Node_alert(db.Model):
    __tablename__ = 'node_alert'

    id = db.Column(db.Integer, primary_key=True)
    node_id = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(200))
    created_date = db.Column(db.String, format(datetime))
    updated_date = db.Column(db.String, format(datetime))
    status = db.Column(db.String(200))

    @propertySasda
    def summary_columns(self):
        return ["id", "name"]

    def __repr__(self):
        return '{}'.format(self.name)