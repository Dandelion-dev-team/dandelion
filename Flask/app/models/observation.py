from app import db


class Observation(db.Model):
    __tablename__ = 'observation'

    id = db.Column(db.Integer, primary_key=True)
    unit_id = db.Column(db.Integer, db.ForeignKey('unit.id'), nullable=False)
    response_variable_id = db.Column(db.Integer, db.ForeignKey('response_variable.id'), nullable=False)
    timestamp = db.Column(db.TIMESTAMP)
    value = db.Column(db.Numeric(10, 3))
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    status = db.Column(db.VARCHAR(20), nullable=False)
    comment = db.Column(db.String(500))

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("timestamp", "timestamp"),
                ("value", "value"),
                ("status", "status")]

