from app import db


class Condition(db.Model):
    __tablename__ = 'condition'

    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    description = db.Column(db.String(200))
    condition_text = db.Column(db.String(200))
    status = db.Column(db.VARCHAR(1))

    @property
    def summary_columns(self):
        return ["id", "description", "status"]



