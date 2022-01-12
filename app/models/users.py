from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login_manager


class Users(UserMixin, db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    school_id = db.Column(db.Integer, db.ForeignKey('school.id'), unique=True)
    username = db.Column(db.String(20))
    password_hash = db.Column(db.String(128))
    is_sysadmin = db.Column(db.Boolean, default=False)
    is_superuser = db.Column(db.Boolean, default=False)
    created_date = db.Column(db.DateTime)
    updated_date = db.Column(db.DateTime)
    status = db.Column(db.String(20))
    notes = db.Column(db.String(200))
    school = db.relationship("School", back_populates="users")
    audit = db.relationship("Audit", back_populates="users", uselist=False)
    session = db.relationship("Session", back_populates="users", uselist=False)

    @property
    def summary_columns(self):
        return ["id", "username", "school_id", "is_sysadmin", "is_superuser", "status"]

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '{Users: {} {}>'.format(self.first_name, self.last_name)


@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))
