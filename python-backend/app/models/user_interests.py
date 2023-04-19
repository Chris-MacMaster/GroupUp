from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

#Join table
user_interests = db.Table("user_interests", 
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),
    db.Column('interest_id', db.Integer, db.ForeignKey(add_prefix_for_prod('interests.id')))))

    