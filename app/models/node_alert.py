from app import db


class Node_alert(db.Model):
    __tablename__ = 'node_alert'

    id = db.Column(db.Integer, primary_key=True)
    node_id = db.Column(db.Integer, db.ForeignKey('node.id'), nullable=False)
    description = db.Column(db.String(200))
    created_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)
    status = db.Column(db.String(200))
    node = db.relationship("Node",back_populates="node_alert")




    def __repr__(self):
        return '{}'.format(self.name)