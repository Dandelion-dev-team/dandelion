from app import db



class Project_leader(db.Model):
    __tablename__ = 'project_leader'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    status = db.Column(db.String(200))


    def __repr__(self):
        return '{}'.format(self.name)