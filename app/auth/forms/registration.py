from flask_wtf import FlaskForm, RecaptchaField
from wtforms import PasswordField, StringField, SubmitField
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError


class RegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    telephone = StringField('Telephone', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired(), EqualTo('confirm_password')])
    confirm_password = PasswordField('Confirm Password')
    submit = SubmitField('Register')