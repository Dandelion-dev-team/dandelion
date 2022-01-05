from app import db


class Hypothesis(db.Model):
    __tablename__ = 'hypothesis'

    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, nullable=False)
    hypothesis_no = db.Column(db.Integer)
    description = db.Column(db.String(200))
    hypothesis_text = db.Column(db.String(200))
    status = db.Column(db.VARCHAR(1))

    @property
    def summary_columns(self):
        return ["id", "hypothesis_no","description","status"]


