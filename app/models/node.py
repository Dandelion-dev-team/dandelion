from app import db


class Node(db.Model):
    __tablename__ = 'node'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'), nullable=False) #FK
    growcube_code = db.Column(db.String(200))
    mac_address = db.Column(db.String(200))
    last_communication_date = db.Column(db.DateTime)
    next_communication_date = db.Column(db.DateTime)
    health_status = db.Column(db.String(20))
    status = db.Column(db.String(20))
    school = db.relationship("School", back_populates="node")
    node_alert = db.relationship("Node_alert", back_populates="node", uselist=False)


    @property
    def summary_columns(self):
        return ["id", "school_id","last_communication_date", "health_status","status"]

