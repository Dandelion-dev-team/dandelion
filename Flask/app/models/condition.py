from app import db


class Condition(db.Model):
    __tablename__ = 'condition'

    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    code = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(500))
    text = db.Column(db.String(5000))
    colour = db.Column(db.String(7))
    status = db.Column(db.VARCHAR(20), nullable=False)

    levels = db.relationship("ConditionLevel", backref="condition")
    units = db.relationship("Unit", backref="condition")

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("code", "code"),
                ("description", "description"),
                ("status", "status")]



