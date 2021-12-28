from app import db


class History(db.Model):
    __tablename__ = 'history'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    created_date = db.Column(db.DateTime)
    table_name = db.Column(db.String(50))
    primary_key_value = db.Column(db.Integer)

    def __repr__(self):
        return '{}'.format(self.name)
