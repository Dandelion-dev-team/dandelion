from app import db


class Response(db.Model):
    __tablename__ = 'response'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    option_id = db.Column(db.Integer, nullable=False)
    response_text = db.Column(db.String(100))

    def __repr__(self):
        return '{}'.format(self.name)
