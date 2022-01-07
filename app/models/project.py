from app import db


class Project(db.Model):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40))
    description = db.Column(db.String(200))
    project_image_link = db.Column(db.String(400))
    project_text = db.Column(db.String(200))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    status = db.Column(db.VARCHAR(1))

    @property
    def summary_columns(self):
        return ["id", "title","description","project_image_link","project_text", "start_date", "end_date"]


    def __repr__(self):
        return '{}'.format(self.name)
