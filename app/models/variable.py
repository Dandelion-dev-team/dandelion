from app import db


class Variable(db.Model):
    __tablename__ = 'variable'


    id = db.Column(db.Integer, primary_key=True)
    condition_id = db.Column(db.Integer, unique=True)
    quantity_id = db.Column(db.Integer, unique=True)
    node_sensor_id = db.Column(db.Integer, unique=True)
    name = db.Column(db.String(30))
    variable_role = db.Column(db.String(30))
    status = db.Column(db.VARCHAR(1))

    def __repr__(self):
        return '{}'.format(self.name)
