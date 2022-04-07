from app import db


class Level(db.Model):
    __tablename__ = 'level'

    id = db.Column(db.Integer, primary_key=True)
    variable_id = db.Column(db.Integer, db.ForeignKey('variable.id'), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    sequence = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(500))
    procedure = db.Column(db.String(5000))

    condition_levels = db.relationship("ConditionLevel", backref="level")
