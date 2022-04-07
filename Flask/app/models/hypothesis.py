from app import db


class Hypothesis(db.Model):
    __tablename__ = 'hypothesis'

    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    hypothesis_no = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500), nullable=False)
    text = db.Column(db.String(5000))
    status = db.Column(db.String(20), nullable=False)

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("hypothesis_no", "hypothesis_no"),
                ("description", "description"),
                ("status", "status")]


