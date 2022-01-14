from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
from app.models import School


class UsersForm(FlaskForm):
    school = QuerySelectField(query_factory=lambda: School.query.all(), get_label="name")
    username = StringField('Username', validators=[DataRequired()])
    password = StringField('Password', validators=[DataRequired(), EqualTo('confirm_password')])
    confirm_password = PasswordField('Confirm Password')
    submit = SubmitField('Register New User')