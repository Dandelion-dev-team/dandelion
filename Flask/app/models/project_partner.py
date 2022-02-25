from app import db


class Project_partner(db.Model):
    __tablename__ = 'project_partner'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    is_lead_partner = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(200))

    def __repr__(self):
        return '{}'.format(self.name)
