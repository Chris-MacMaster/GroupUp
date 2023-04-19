from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


group_categories = db.Table("group_categories",
    db.Model.metadata,
    db.Column('group_id', db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id'))),
    db.Column('category_id', db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id'))))
