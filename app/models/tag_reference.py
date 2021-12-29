from app import db


class Tag_reference(db.Model):
    __tablename__ = 'tag_reference'

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.Integer)
    status = db.Column(db.String)

    def __repr__(self):
        return '{}'.format(self.name)
