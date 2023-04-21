from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


user_groups = db.Table("user_groups",
    db.Model.metadata,
    db.Column('group_id', db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id'))),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))))


if environment == "production":
    user_groups.schema = SCHEMA
