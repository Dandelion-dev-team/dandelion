from app import db


class Authority(db.Model):
    __tablename__ = 'authority'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60))
    telephone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    school = db.relationship('School',back_populates='authority',uselist=False)

    @property
    def summary_columns(self):
        return ["id", "name",]

    def __repr__(self):
        return '{}'.format(self.name)