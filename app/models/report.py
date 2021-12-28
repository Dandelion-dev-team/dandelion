from app import db


class Report(db.Model):
    __tablename__ = 'report'

    id = db.Column(db.Integer, primary_key=True)
    parent_id = db.Column(db.Integer, nullable=False)
    report_type = db.Column(db.VARCHAR(1))
    report_stage = db.Column(db.VARCHAR(1))
    report_date = db.Column(db.DateTime)
    title = db.Column(db.String(20))
    document_link = db.Column(db.String(200))
    created_date = db.Column(db.DateTime)
    created_by = db.Column(db.Integer, nullable=False)
    updated_date = db.Column(db.DateTime)
    status = db.Column(db.VARCHAR(1))

    def __repr__(self):
        return '{}'.format(self.name)
