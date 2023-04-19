from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod
# from sqlalchemy.orm import validates
from sqlalchemy.sql import func
from app.models import user_interests

class Interest(db.Model):
    __tablename__ = "interests"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    interest = db.Column(db.String, nullable=False)

    # many to many
    users = db.relationship("User", secondary=user_interests)


    def to_dict(self):
        return {
            'id': self.id,
            'interest': self.interest,
        }
