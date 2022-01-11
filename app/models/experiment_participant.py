from app import db


# class Experiment_participant(db.Model):
#     __tablename__ = 'experiment_participant'
#
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, nullable=False)
#     experiment_id = db.Column(db.Integer, nullable=False)
#     status = db.Column(db.String(200))
#
#     def __repr__(self):
#         return '{}'.format(self.name)
