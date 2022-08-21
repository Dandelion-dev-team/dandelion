from app import db


class ResponseVariable(db.Model):
    __tablename__ = 'response_variable'

    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    variable_id = db.Column(db.Integer, db.ForeignKey('variable.id'), nullable=False)
    monday = db.Column(db.Boolean)
    tuesday = db.Column(db.Boolean)
    wednesday = db.Column(db.Boolean)
    thursday = db.Column(db.Boolean)
    friday = db.Column(db.Boolean)
    saturday = db.Column(db.Boolean)
    sunday = db.Column(db.Boolean)
    once = db.Column(db.Boolean)
    final = db.Column(db.Boolean)

    observations = db.relationship('Observation', backref='response_variable')
