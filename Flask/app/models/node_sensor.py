from app import db


class NodeSensor(db.Model):
    __tablename__ = 'node_sensor'

    id = db.Column(db.Integer, primary_key=True)
    node_id = db.Column(db.Integer, db.ForeignKey('node.id'), nullable=False)
    sensor_id = db.Column(db.Integer, db.ForeignKey('sensor.id'), nullable=False)
    cube_level = db.Column(db.String(10), db.CheckConstraint("cube_level in ('top', 'middle', 'bottom')"))
    status = db.Column(db.String(20), nullable=False)

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("sensor", "sensor.code"),
                ("cube_level", "cube_level"),
                ("status", "status")]
