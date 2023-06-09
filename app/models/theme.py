from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod
# from sqlalchemy.orm import validates
from sqlalchemy.sql import func
from .event_themes import event_themes


class Theme(db.Model):
    __tablename__ = "themes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    theme = db.Column(db.String, nullable=False)

    #many to many
    events = db.relationship("Event", secondary=event_themes, back_populates='themes')

    def to_dict(self):
        return {
            'id': self.id,
            'theme': self.theme
    }
