from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class AuthorityForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    telephone = StringField('Telephone', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    submit = SubmitField('Save')