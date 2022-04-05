from app import db


class Report(db.Model):
    __tablename__ = 'report'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    report_stage = db.Column(db.String(20), nullable=False)
    report_date = db.Column(db.DateTime, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    document_link = db.Column(db.String(200))
    status = db.Column(db.VARCHAR(20), nullable=False)

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("report_name", "title"),
                ("title", "title"),
                ("document_link", "document_link")]

