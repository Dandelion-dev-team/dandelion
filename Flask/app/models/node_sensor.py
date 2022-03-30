from app import db


class Node_sensor(db.Model):
    __tablename__ = 'node_sensor'

    id = db.Column(db.Integer, primary_key=True)
    node_id = db.Column(db.Integer, db.ForeignKey('node.id'), nullable=False)
    sensor_id = db.Column(db.Integer, db.ForeignKey('sensor.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False)

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("sensor_id", ),
                ("status", "status")]

