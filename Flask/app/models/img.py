from app import db


class Img(db.Model):
    __tablename__ = 'img'

    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String, unique=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    mimetype = db.Column(db.String, nullable=False)
