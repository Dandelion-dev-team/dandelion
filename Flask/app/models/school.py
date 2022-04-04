from app import db


class School(db.Model):
    __tablename__ = 'school'

    id = db.Column(db.Integer, primary_key=True)
    authority_id = db.Column(db.Integer, db.ForeignKey('authority.id'), nullable=False) #FK1
    name = db.Column(db.String(100), nullable=False)
    address_line_1 = db.Column(db.String(100))
    address_line_2 = db.Column(db.String(100))
    town = db.Column(db.String(50), nullable=False)
    postcode = db.Column(db.String(10), nullable=False)
    latitude = db.Column(db.DECIMAL(8,6))
    longitude = db.Column(db.DECIMAL(9,6))
    telephone = db.Column(db.String(15))
    email = db.Column(db.String(60))
    school_image_link = db.Column(db.String(400))
    status = db.Column(db.String(20), nullable=False)
    users = db.relationship("User", backref="school")
    node = db.relationship("Node", backref="school")
    project_partners = db.relationship("ProjectPartner", backref="school")

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("authority_id", "authority_id"),
                ("latitude", "latitude"),
                ("longitude", "longitude"),
                ("name", "name")]
