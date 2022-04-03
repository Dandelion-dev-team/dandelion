from app import db


class Experiment(db.Model):
    __tablename__ = 'experiment'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project_partner_id = db.Column(db.Integer, db.ForeignKey('project_partner.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=True)
    code = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    experiment_image_link = db.Column(db.String(300))
    text = db.Column(db.String(200))
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.VARCHAR(20), nullable=False)
    hypotheses = db.relationship("Hypothesis", backref="experiment")
    conditions = db.relationship("Condition", backref="experiment")
    response_variables = db.relationship("ResponseVariable", backref="experiment")

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("title", "title"),
                ("description", "description"),
                ("owner_id", "project_partner.school.id"),
                ("owner_name", "project_partner.school.name")]

