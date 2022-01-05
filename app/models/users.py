from app import db


class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, unique=True, nullable=False)
    username = db.Column(db.String(20))
    password_hash = db.Column(db.String(128))
    is_sysadmin = db.Column(db.Boolean, nullable=False)
    is_superuser = db.Column(db.Boolean, nullable=False)
    created_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)
    status = db.Column(db.VARCHAR)
    notes = db.Column(db.String(200))

    @property
    def summary_columns(self):
        return ["id", "username","school_id","is_sysadmin","is_superuser","status"]

    def __repr__(self):
        return '{}'.format(self.name)
