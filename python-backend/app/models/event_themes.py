from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


event_themes = db.Table("event_themes",
    db.Column('event_id', db.Integer, db.ForeignKey(add_prefix_for_prod('events.event_id')),
    db.Column('theme_id', db.Integer, db.ForeignKey(add_prefix_for_prod('themes.theme_id')))))
