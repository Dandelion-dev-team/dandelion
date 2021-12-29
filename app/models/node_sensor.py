from app import db


class Node_sensor(db.Model):
    __tablename__ = 'node_sensor'

    id = db.Column(db.Integer, primary_key=True)
    node_id = db.Column(db.Integer, nullable=False)
    sensor_id = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(200))

    @property
    def summary_columns(self):
        return ["id", "name"]

    def __repr__(self):
        return '{}'.format(self.name)
