from app import db


class Unit(db.Model):
    __tablename__ = 'unit'

    id = db.Column(db.Integer, primary_key=True)
    condition_id = db.Column(db.Integer, db.ForeignKey('condition.id'), nullable=False)
    code = db.Column(db.String(20))
    node_id = db.Column(db.Integer, db.ForeignKey('node.id'), nullable=True)
    cube_level = db.Column(db.String(10), db.CheckConstraint("cube_level in ('top', 'middle', 'bottom')"))
    replicate_no = db.Column(db.Integer)
    grid_row = db.Column(db.String(1), db.CheckConstraint("grid_row in ('A', 'B', 'C', 'D', 'E')"))
    grid_column = db.Column(db.Integer, db.CheckConstraint('grid_column between 1 and 5'))
    location = db.Column(db.String(500))
