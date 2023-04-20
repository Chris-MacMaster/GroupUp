from app.models import db, environment, SCHEMA, User, Interest
from sqlalchemy.sql import text


def seed_user_interests(): 

    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)

    competitive = Interest.query.get(1)
    casual = Interest.query.get(2)
    dps = Interest.query.get(3)
    support = Interest.query.get(4)
    tank = Interest.query.get(5)
    flex = Interest.query.get(6)


    demo.interest.append(casual)
    demo.interest.append(support)

    marnie.interest.append(competitive)
    marnie.interest.append(tank)

    bobbie.interest.append(flex)

    db.session.commit()


def undo_user_interests():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_interests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_interests"))

    db.session.commit()

    

