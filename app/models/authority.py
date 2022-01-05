from app import db


class Authority(db.Model):
    __tablename__ = 'authority'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=True, nullable=False)
    telephone = db.Column(db.String(20))
    email = db.Column(db.String(100))

    @property
    def summary_columns(self):
        return ["id", "name",]

