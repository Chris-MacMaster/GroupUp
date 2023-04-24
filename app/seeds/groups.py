from app.models import db, Group, environment, SCHEMA
from sqlalchemy.sql import text


def seed_groups():
    group1 = Group(
        name='Tank Lovers',
        description='More people play our role please.',
        img_url='tank',
        organizer="Demo",
        num_members=1,
    )

    group2 = Group(
        name='Doctors that No One Guards',
        description='They always need healing.',
        img_url='healer',
        organizer="marnie",
        num_members=2,
    )

    group3 = Group(
        name='Just Heal Us',
        description='I dont know how to swap or peel.',
        img_url='dps',
        organizer="marnie",
        num_members=3, 
    )

    db.session.add_all([group1, group2, group3])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_groups():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM groups"))

    db.session.commit()
