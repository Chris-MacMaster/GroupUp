from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


user_interests = db.Table("user_interests", 
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.user_id')),
    db.Column('interest_id', db.Integer, db.ForeignKey(add_prefix_for_prod('interests.interest_id')))))

    