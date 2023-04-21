from app.models import db, Event, environment, SCHEMA
from sqlalchemy.sql import text


def seed_events():
    event1 = Event(
        name='Meet and Greet',
        details='A meetup, introductions.',
        num_going=3,
        group_limit=5,
        host='Tank Lovers',
        format='Intros, then food, then adjourned.',
        description='A chance to meet as a team before playing. Still need another 2',
        date='11/20/23',
        strangers=True,
        online=False,
        group_id=1,
        saved=False
    )

    event2 = Event(
        name='Casual Comp',
        details='Comp without the yelling.',
        num_going=3,
        group_limit=5,
        host='Tank Lovers',
        format='Gameplay session for the team from our last event, "Meet and Greet".',
        description='We go win.',
        date='11/21/23',
        strangers=False,
        online=True,
        group_id=1,
        saved=False
    )

    event3 = Event(
        name='Park Visit',
        details='A chance to touch grass.',
        num_going=1,
        group_limit=10,
        host='Doctors that No One Guards',
        format='A walk in the local park',
        description='About a 15 minute stroll around the park as a change of pace.',
        date='08/12/23',
        strangers=True,
        online=True,
        group_id=2,
        saved=False
    )

    db.session.add_all([event1, event2, event3])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_events():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM events"))

    db.session.commit()
