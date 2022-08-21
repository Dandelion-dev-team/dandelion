from sqlalchemy.orm import backref

from app import db
import os
from app.utils.uploads import get_uploaded_file, content_folder


class Experiment(db.Model):
    __tablename__ = 'experiment'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    project_partner_id = db.Column(db.Integer, db.ForeignKey('project_partner.id'), nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('experiment.id'), nullable=True)
    code = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    experiment_image_link = db.Column(db.String(300))
    text = db.Column(db.String(5000))
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.VARCHAR(20), nullable=False)
    hypotheses = db.relationship("Hypothesis", backref="experiment", passive_deletes=True)
    conditions = db.relationship("Condition", backref="experiment", passive_deletes=True)
    response_variables = db.relationship("ResponseVariable", backref="experiment", passive_deletes=True)
    children = db.relationship("Experiment", backref=backref('parent', remote_side=[id]), passive_deletes=True)
    participants = db.relationship("ExperimentParticipant", backref="experiment", passive_deletes=True)

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("title", "title"),
                ("code", "code"),
                ("description", "description"),
                ("text", "text"),
                ("start_date", "start_date"),
                ("end_date", "end_date"),
                ("status", "status"),
                ("parent_id", "parent_id"),
                ("project_id", "project_id"),
                ("owner_id", "project_partner.school.id"),
                ("owner_name", "project_partner.school.name"),
                ("project_title", "project.title")]

