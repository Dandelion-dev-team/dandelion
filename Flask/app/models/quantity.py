from app import db


class Quantity(db.Model):
    __tablename__ = 'quantity'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    unit = db.Column(db.String(5))
    lower_limit = db.Column(db.DECIMAL)
    upper_limit = db.Column(db.DECIMAL)
    help_url = db.Column(db.String(500))

    variables = db.relationship("Variable", backref="quantity", passive_deletes=True)

    def __repr__(self):
        return '{}'.format(self.name)
