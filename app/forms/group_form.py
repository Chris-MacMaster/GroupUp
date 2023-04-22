from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class CreateGroupForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    img_url = StringField('img_url')
    organizer = IntegerField('organizer', validators=[DataRequired()])
    num_members = IntegerField('num_members', validators=[DataRequired()])
