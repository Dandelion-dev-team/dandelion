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
    node_alerts = db.relationship("NodeAlert", backref="node", cascade="all, delete")
    node_sensors = db.relationship("NodeSensor", backref="node", passive_deletes=True)


    @property
    def summary_columns(self):
        return [("id", "id"),
                ("school_id", "school_id"),
                ("last_communication_date", "last_communication_date"),
                ("health_status", "health_status"),
                ("status", "status")]

