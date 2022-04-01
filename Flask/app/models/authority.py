from app import db


class Authority(db.Model):
    __tablename__ = 'authority'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60))
    telephone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    school = db.relationship('School', backref='authority')

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("name", "name")]

    def __repr__(self):
        return '{}'.format(self.name)
