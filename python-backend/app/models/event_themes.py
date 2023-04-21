from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

event_themes = db.Table("event_themes",
    db.Model.metadata,
    db.Column('event_id', db.Integer, db.ForeignKey(add_prefix_for_prod('events.id'))),
    db.Column('theme_id', db.Integer, db.ForeignKey(add_prefix_for_prod('themes.id'))))


if environment == "production":
    event_themes.schema = SCHEMA
