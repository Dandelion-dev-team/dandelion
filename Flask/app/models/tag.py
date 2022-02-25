from app import db


class Tag(db.Model):
    __tablename__ = 'tag'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    experiment_id = db.Column(db.String(300), db.ForeignKey('experiment.id'), nullable=False)
    tag_reference_id = db.Column(db.String,  db.ForeignKey('tag_reference.id'), nullable=False)

    @property
    def summary_columns(self):
        return ["id", "tag_reference_id"]


