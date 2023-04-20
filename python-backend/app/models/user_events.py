from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


user_groups = db.Table("user_events",
    db.Model.metadata,
    db.Column('event_id', db.Integer, db.ForeignKey(add_prefix_for_prod('events.id'))),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))))
