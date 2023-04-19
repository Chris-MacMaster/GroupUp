from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func



class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String(10), nullable=False)
    organizer = db.Column(db.String(50), nullable=False)
    num_members = db.Column(db.Integer, default=1)
