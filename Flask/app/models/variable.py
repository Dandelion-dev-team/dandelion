from app import db


class Variable(db.Model):
    __tablename__ = 'variable'

    id = db.Column(db.Integer, primary_key=True)
    quantity_id = db.Column(db.Integer, db.ForeignKey('quantity.id'), nullable=True)
    name = db.Column(db.String(100))
    is_sensor_quantity = db.Column(db.Boolean, default=False)
    procedure = db.Column(db.String(5000))
    status = db.Column(db.VARCHAR(20))

    levels = db.relationship("Level", backref="variable")
    response_variables = db.relationship("ResponseVariable", backref="variable")

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("quantity_id", "quantity_id"),
                ("name", "name"),
                ("status", "status")]

