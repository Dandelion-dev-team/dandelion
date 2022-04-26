from app import db


class Issue(db.Model):
    __tablename__ = 'issue'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    reported_date = db.Column(db.DateTime, nullable=False)
    symptoms = db.Column(db.String(5000))
    steps_to_reproduce = db.Column(db.String(5000))
    notes = db.Column(db.String(5000))
    type = db.Column(db.String(500))
    priority = db.Column(db.String(200))
    status = db.Column(db.String(20))
