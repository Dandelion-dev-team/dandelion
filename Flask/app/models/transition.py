from app import db


class Transition(db.Model):
    __tablename__ = 'transition'

    id = db.Column(db.Integer, primary_key=True)
    from_status_id = db.Column(db.Integer, db.ForeignKey('status.id'), nullable=False)
    to_status_id = db.Column(db.Integer, db.ForeignKey('status.id'), nullable=False)
