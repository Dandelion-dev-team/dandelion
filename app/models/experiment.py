from app import db


class Experiment(db.Model):
    __tablename__ = 'experiment'

    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, nullable=False)
    partner_id = db.Column(db.Integer, nullable=False)
    is_synchronised = db.Column(db.Boolean)
    title = db.Column(db.String(50))
    description = db.Column(db.String(200))
    experiment_image_link = db.Column(db.String(300))
    experiment_text = db.Column(db.String(200))
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    status = db.Column(db.VARCHAR(1))

    @property
    def summary_columns(self):
        return ["id", "title","description","experiment_image_link","experiment_text", "start_date", "end_date"]


    def __repr__(self):
        return '{}'.format(self.name)
