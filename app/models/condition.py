from app import db


class Condition(db.Model):
    __tablename__ = 'condition'


    id = db.Column(db.Integer, primary_key=True)
    experiment_id = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(200))
    condition_text = db.Column(db.String(200))
    status = db.Column(db.VARCHAR(1))

    def __repr__(self):
        return '{}'.format(self.name)
