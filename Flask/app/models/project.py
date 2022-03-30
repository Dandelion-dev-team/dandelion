from app import db


class Project(db.Model):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    project_image_link = db.Column(db.String(400))
    project_text = db.Column(db.String(200))
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.VARCHAR(20), nullable=False)

    experiments = db.relationship("Experiment", backref='project')

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("title", "title"),
                ("description", "description"),
                ("project_image_link", "project_image_link"),
                ("project_text", "project_text"),
                ("start_date", "start_date"),
                ("end_date", "end_date")]


    def __repr__(self):
        return '{}'.format(self.name)
