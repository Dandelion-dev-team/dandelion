from app import db


class Quantity(db.Model):
    __tablename__ = 'quantity'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60))
    unit = db.Column(db.String(5))
    help_url = db.Column(db.String(100))

    def __repr__(self):
        return '{}'.format(self.name)