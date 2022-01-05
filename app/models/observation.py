from app import db


class Observation(db.Model):
    __tablename__ = 'observation'

    id = db.Column(db.Integer, primary_key=True)
    variable_id = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.TIMESTAMP)
    value = db.Column(db.Integer)
    observation_image_link = (db.String(200))
    created_by = db.Column(db.Integer, nullable=False)
    status = db.Column(db.VARCHAR(1))
    comment = db.Column(db.String(30))

    @property
    def summary_columns(self):
        return ["id", "timestamp","value","observation_image_link","status"]

