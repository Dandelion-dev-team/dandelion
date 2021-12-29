from app import db



class Project_leader(db.Model):
    __tablename__ = 'project_leader'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(60), unique=True, nullable=False)
    project_id = db.Column(db.String, nullable=False)
    status = db.Column(db.String(200))

    @property
    def summary_columns(self):
        return ["id", "name"]

    def __repr__(self):
        return '{}'.format(self.name)