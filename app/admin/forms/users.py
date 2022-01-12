from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError


class UsersForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password_hash = StringField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password')
    submit = SubmitField('Save')