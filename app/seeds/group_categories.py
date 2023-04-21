from app.models import db, environment, SCHEMA, Group, Category
from sqlalchemy.sql import text


def seed_group_categories():

    group1 = Group.query.get(1)
    group2 = Group.query.get(2)
    group3 = Group.query.get(3)

    competitive = Category.query.get(1)
    casual = Category.query.get(2)
    dps = Category.query.get(3)
    support = Category.query.get(4)
    tank = Category.query.get(5)
    flex = Category.query.get(6)

    group1.categories.append(casual)
    group1.categories.append(tank)

    group2.categories.append(competitive)
    group2.categories.append(support)

    group3.categories.append(casual)

    db.session.commit()


def undo_group_categories():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.group_categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM group_categories"))

    db.session.commit()
