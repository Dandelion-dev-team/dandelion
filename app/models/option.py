from app import db


class Option(db.Model):
    __tablename__ = 'option'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer,db.ForeignKey('question.id'), nullable=False)
    value = db.Column(db.Integer)
    label = db.Column(db.Integer)
    description = db.Column(db.String(200))
    status = db.Column(db.String(20))
    question = db.relationship('Question', back_populates='option')

    def __repr__(self):
        return '{}'.format(self.name)
