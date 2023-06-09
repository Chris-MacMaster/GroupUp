from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

#Join table
user_interests = db.Table("user_interests", db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('interest_id', db.Integer, db.ForeignKey(add_prefix_for_prod('interests.id')), primary_key=True))

    
if environment == "production":
    user_interests.schema = SCHEMA
