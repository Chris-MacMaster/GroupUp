from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


from .user_groups import user_groups
from .group_categories import group_categories


class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    img_url = db.Column(db.String)
    organizer = db.Column(db.String(50), nullable=False)
    num_members = db.Column(db.Integer, default=1)

    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    events = db.relationship('Event', back_populates='groups')
    
    users = db.relationship('User', secondary=user_groups, back_populates="groups")
    categories = db.relationship("Category", secondary=group_categories, back_populates="groups")


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'imgUrl': self.img_url,
            'organizer': self.organizer,
            'num_members': self.num_members,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
    }
