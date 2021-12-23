from app import db


class Sensor(db.Model):
    __tablename__ = 'sensor'

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(60), unique=True, nullable=False)
    description = db.Column(db.String(100))
    URL = db.Column(db.String(200))
    datasheet_link = db.Column(db.String(200))

    def __repr__(self):
        return '{}'.format(self.name)
