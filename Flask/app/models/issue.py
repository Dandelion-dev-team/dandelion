from app import db


class Issue(db.Model):
    __tablename__ = 'issue'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    reported_date = db.Column(db.DateTime, nullable=False)
    symptoms = db.Column(db.String(5000), nullable=False)
    steps_to_reproduce = db.Column(db.String(5000), nullable=False)
    notes = db.Column(db.String(5000))
    type = db.Column(db.String(20), db.CheckConstraint("type in ('bug', 'enhancement request', 'other')"), nullable=False)
    priority = db.Column(db.String(20), db.CheckConstraint("priority in ('urgent', 'high', 'low')"), nullable=False)
    status = db.Column(db.String(20), nullable=False)

