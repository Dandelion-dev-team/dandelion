from app import db


class Option(db.Model):
    __tablename__ = 'option'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, nullable=False)
    value = db.Column(db.Integer)
    label = db.Column(db.Integer)
    description = db.Column(db.String(200))
    status = db.Column(db.VARCHAR(1))

    def __repr__(self):
        return '{}'.format(self.name)
