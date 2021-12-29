from app import db



class Audit_detail(db.Model):
    __tablename__ = 'audit_detail'

    id = db.Column(db.Integer, primary_key=True)
    history_id = db.Column(db.String(60), unique=True, nullable=False)
    column_name = db.Column(db.String(100))
    old_value = db.Column(db.String(100))


    @property
    def summary_columns(self):
        return ["id", "name"]

    def __repr__(self):
        return '{}'.format(self.name)