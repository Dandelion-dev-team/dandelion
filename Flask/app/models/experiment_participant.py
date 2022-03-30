from app import db


class ExperimentParticipant(db.Model):
    __tablename__ = 'experiment_participant'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    status = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return '{}'.format(self.name)
