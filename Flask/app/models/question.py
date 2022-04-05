from app import db


class Question(db.Model):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    response_type = db.Column(db.String(20), nullable=False)
    question_stage = db.Column(db.String(20))
    status = db.Column(db.String(20), nullable=False)
    option = db.relationship('Option', backref='question')


    def __repr__(self):
        return '{}'.format(self.description)
