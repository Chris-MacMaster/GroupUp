from app.models import db, environment, SCHEMA, Event, Theme
from sqlalchemy.sql import text


def seed_group_events():

    event1 = Event.query.get(1)
    event2 = Event.query.get(2)
    event3 = Event.query.get(3)

    competitive = Theme.query.get(1)
    casual = Theme.query.get(2)
    dps = Theme.query.get(3)
    support = Theme.query.get(4)
    tank = Theme.query.get(5)
    flex = Theme.query.get(6)

    event1.theme.append(casual)

    event2.theme.append(dps)
    event2.theme.append(support)
    event2.theme.append(tank)
    event2.theme.append(flex)

    event3.theme.append(casual)

    db.session.commit()


def undo_event_themes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.event_themes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_themes"))

    db.session.commit()
