from app import db


class School(db.Model):
    __tablename__ = 'school'

    id = db.Column(db.Integer, primary_key=True)
    authority_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100))
    address_line_1 = db.Column(db.String(150))
    address_line_2 = db.Column(db.String(150))
    town = db.Column(db.String(50))
    postcode = db.Column(db.String(10))
    telephone = db.Column(db.String(15))
    email = db.Column(db.String)
    school_image_link = db.Column(db.String)
    status = db.Column(db.String(200))

    @property
    def summary_columns(self):
        return ["id", "name"]

    def __repr__(self):
        return '{}'.format(self.name)