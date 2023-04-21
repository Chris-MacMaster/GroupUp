from flask_sqlalchemy import SQLAlchemy
from .db import db, SCHEMA, environment, add_prefix_for_prod
# from sqlalchemy.orm import validates
from sqlalchemy.sql import func
from .group_categories import group_categories

class Category(db.Model):
    __tablename__ = "categories"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String, nullable=False)

    # Many to Many
    groups = db.relationship("Group", secondary=group_categories, back_populates="categories")


    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category
        }
