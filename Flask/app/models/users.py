from werkzeug.security import generate_password_hash, check_password_hash
from app import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'))
    username = db.Column(db.String(20), unique=True)
    password_hash = db.Column(db.String(128))
    is_sysadmin = db.Column(db.Boolean, default=False)
    is_superuser = db.Column(db.Boolean, default=False)
    status = db.Column(db.String(20))
    notes = db.Column(db.String(200))
    audit = db.relationship("Audit", backref="users")
    session = db.relationship("Session", backref="users")

    @property
    def summary_columns(self):
        return [("id", "id"),
                ("username", "username"),
                ("school_id", "school_id"),
                ("is_sysadmin", "is_sysadmin"),
                ("is_superuser", "is_superuser"),
                ("status", "status")]

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return self.username


