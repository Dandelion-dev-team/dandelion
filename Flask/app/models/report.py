from app import db


class Report(db.Model):
    __tablename__ = 'report'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    experiment_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=False)
    report_stage = db.Column(db.VARCHAR(1))
    report_date = db.Column(db.DateTime)
    title = db.Column(db.String(20))
    document_link = db.Column(db.String(200))
    status = db.Column(db.VARCHAR(1))

    @property
    def summary_columns(self):
        return ["id", "report_name","title","document_link"]

