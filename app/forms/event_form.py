from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class CreateEventForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    details = StringField('details', validators=[DataRequired()])
    num_going = IntegerField('num_going', validators=[DataRequired()])
    group_limit = IntegerField('group_limit', validators=[DataRequired()])
    host = StringField('host', validators=[DataRequired()])
    format = StringField('format', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    strangers = BooleanField('strangers')
    online = BooleanField('online')
    saved = BooleanField('saved')

    group_id = IntegerField('group_id', validators=[DataRequired()])