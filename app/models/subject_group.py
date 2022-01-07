from app import db


class SubjectGroup(db.Model):
    __tablename__ = 'subject_group'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(60), unique=True, nullable=False)




    def __repr__(self):
        return '{}'.format(self.name)