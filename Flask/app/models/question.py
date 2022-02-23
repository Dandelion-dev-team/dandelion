from app import db


class Question(db.Model):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    response_type = db.Column(db.VARCHAR(1))
    question_stage = db.Column(db.VARCHAR(1))
    status = db.Column(db.String(200))
    option = db.relationship('Option', backref='question')


    def __repr__(self):
        return '{}'.format(self.name)
