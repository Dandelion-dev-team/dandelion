from app import db


class AuditDetail(db.Model):
    __tablename__ = 'audit_detail'

    id = db.Column(db.Integer, primary_key=True)
    audit_id = db.Column(db.Integer, db.ForeignKey('audit.id'), nullable=False)
    column_name = db.Column(db.String(100))
    old_value = db.Column(db.String(5000))

    def __repr__(self):
        return '{}'.format(self.name)
