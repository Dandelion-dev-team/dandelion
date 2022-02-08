from app import db


class School(db.Model):
    __tablename__ = 'school'

    id = db.Column(db.Integer, primary_key=True)
    authority_id = db.Column(db.Integer, db.ForeignKey('authority.id'), nullable=False) #FK1
    name = db.Column(db.String(100))
    address_line_1 = db.Column(db.String(150))
    address_line_2 = db.Column(db.String(150))
    town = db.Column(db.String(50))
    postcode = db.Column(db.String(10))
    latitude = db.Column(db.DECIMAL(8,6))
    longitude = db.Column(db.DECIMAL(9,6))
    telephone = db.Column(db.String(15))
    email = db.Column(db.String(60))
    school_image_link = db.Column(db.String(400))
    status = db.Column(db.String(200))
    users = db.relationship("User", backref="school")
    node = db.relationship("Node", backref="school")

    @property
    def summary_columns(self):
        return ["id", "authority_id", "name"]




