from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


user_groups = db.Table("user_groups",
    db.Column('group_id', db.Integer, db.ForeignKey(add_prefix_for_prod('groups.group_id')),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id')))))
