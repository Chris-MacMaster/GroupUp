from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .event_themes import event_themes
from .user_events import user_events

class Event(db.Model): 
    __tablename__ = 'events'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    details = db.Column(db.String, nullable=False)
    num_going = db.Column(db.Integer, default=0)
    group_limit = db.Column(db.Integer, nullable=False)
    host = db.Column(db.String(50), nullable=False)
    format = db.Column(db.String, nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.String(10)) # custom validate on front end
    strangers = db.Column(db.String, nullable=False)
    online = db.Column(db.String, nullable=False)
    saved = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    # One to Many
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')))
    groups = db.relationship('Group', back_populates='events')

    # One to Many
    event_images = db.relationship('EventImage', back_populates='events', cascade="all, delete")
    
    # Many to Many
    users = db.relationship('User', secondary=user_events, back_populates="events")
    themes = db.relationship("Theme", secondary=event_themes, back_populates="events")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'details': self.details,
            'numGoing': self.num_going,
            'groupLimit': self.group_limit,
            'host': self.host,
            'format': self.format,
            'description': self.description,
            'date': self.date,
            'strangers': self.strangers,
            'online': self.online,
            'saved': self.online,
            'groupId': self.group_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
    }
