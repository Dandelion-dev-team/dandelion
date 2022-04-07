from app import db


class Node_alert(db.Model):
    __tablename__ = 'node_alert'

    id = db.Column(db.Integer, primary_key=True)
    node_id = db.Column(db.Integer, db.ForeignKey('node.id'), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    updated_date = db.Column(db.DateTime)
    status = db.Column(db.String(20), nullable=False)




    def __repr__(self):
        return '{}'.format(self.name)
