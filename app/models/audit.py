from app import db


class Audit(db.Model):
    __tablename__ = 'audit'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True, nullable=False)
    audit_date = db.Column(db.DateTime)
    table_name = db.Column(db.String(100))
    primary_key_value = db.Column(db.Integer)
    users = db.relationship('Users', back_populates='audit', uselist=False)
    audit_detail = db.relationship('Audit_detail', back_populates='audit', uselist=False )

    def __repr__(self):
        return '{}'.format(self.name)
