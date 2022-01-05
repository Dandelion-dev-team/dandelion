from app import db


class Node(db.Model):
    __tablename__ = 'node'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'), nullable=False) #FK
    growcube_code = db.Column(db.String(200))
    mac_address = db.Column(db.String(200))
    last_communication_date = db.Column(db.DateTime)
    next_communication_date = db.Column(db.DateTime)
    health_status = db.Column(db.VARCHAR)
    created_date = db.Column(db.DateTime)
    created_by = db.Column(db.String, unique=True, nullable=False)
    updated_date = db.Column(db.DateTime)
    status = db.Column(db.VARCHAR)
    school = db.relationship("School", back_populates="school")

    @property
    def summary_columns(self):
        return ["id", "school_id","last_communication_date", "health_status","status"]

