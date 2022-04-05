from app import db


class Sensor(db.Model):
    __tablename__ = 'sensor'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(60), nullable=False)
    description = db.Column(db.String(500))
    URL = db.Column(db.String(500))
    datasheet_link = db.Column(db.String(500))
    sensor_quantity = db.relationship("Sensor_quantity", backref="sensor")



    def __repr__(self):
        return '{}'.format(self.name)
