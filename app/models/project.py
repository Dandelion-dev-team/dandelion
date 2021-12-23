from app import db


class Project(db.Model):
    __tablename__ = 'project'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40))
    description = db.Column(db.session(200))
    project_image_link = db.Column(db.String)
    project_text = db.Column(db.String(200))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    status = db.Column(db.VARCHAR(1))


    def __repr__(self):
        return '{}'.format(self.name)
