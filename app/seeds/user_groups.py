from app.models import db, environment, SCHEMA, User, Group
from sqlalchemy.sql import text


def seed_user_groups():

    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)

    group1 = Group.query.get(1)
    group2 = Group.query.get(2)
    group3 = Group.query.get(3)
  

    demo.groups.append(group1)
    demo.groups.append(group2)
    demo.groups.append(group3)

    marnie.groups.append(group2)
    marnie.groups.append(group3)

    bobbie.groups.append(group3)

    db.session.commit()


def undo_user_groups():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_groups"))

    db.session.commit()
