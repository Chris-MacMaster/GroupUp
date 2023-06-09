from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod
from sqlalchemy.sql import func


class EventImage(db.Model):
    __tablename__ = 'event_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    # One to Many
    event_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("events.id")))
    events = db.relationship('Event', back_populates='event_images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'eventId': self.event_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
    }
