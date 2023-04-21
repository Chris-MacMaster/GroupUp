from app.models import db, environment, SCHEMA, User, Event
from sqlalchemy.sql import text


def seed_user_events():

    demo = User.query.get(1)
    marnie = User.query.get(2)
    bobbie = User.query.get(3)

    event1 = Event.query.get(1)
    event2 = Event.query.get(2)
    event3 = Event.query.get(3)
   

    demo.events.append(event1)
    demo.events.append(event2)

    marnie.events.append(event3)

    db.session.commit()


def undo_user_events():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.user_events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_events"))

    db.session.commit()
