from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


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
    public = db.Column(db.Boolean, default=True)
    online = db.Column(db.Boolean, nullable=False)
    saved = db.Column(db.Boolean, default=False)

    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
    event_images = db.relationship('EventImage', back_populates='events', cascade="all, delete")
    
