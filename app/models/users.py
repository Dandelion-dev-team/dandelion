from app import db


class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'), unique=True, nullable=False)
    username = db.Column(db.String(20))
    password_hash = db.Column(db.String(128))
    is_sysadmin = db.Column(db.Boolean, nullable=False)
    is_superuser = db.Column(db.Boolean, nullable=False)
    created_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)
    status = db.Column(db.VARCHAR)
    notes = db.Column(db.String(200))
    school = db.relationship("School", back_populates="users")
    audit = db.relationship("Audit", back_populates="users", uselist=False)
    session = db.relationship("Session",back_populates="users", uselist=False)

    @property
    def summary_columns(self):
        return ["id", "username","school_id","is_sysadmin","is_superuser","status"]


