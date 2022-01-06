from app import db


class Sensor_quantity(db.Model):
    __tablename__ = 'sensor_quantity'

    id = db.Column(db.Integer, primary_key=True)
    sensor_id = db.Column(db.Integer, db.ForeignKey('sensor.id'), nullable=False)
    quantity_id = db.Column(db.Integer, nullable=False)
    sensor = db.relationship("Sensor", back_populates="sensor_quantity")

    def __repr__(self):
        return '{}'.format(self.name)
