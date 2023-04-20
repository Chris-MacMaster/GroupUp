from app.models import db, Interest, environment, SCHEMA
from sqlalchemy.sql import text


def seed_interests():
    interest1 = Interest(
        interest="Competitive"
    )

    interest2 = Interest(
        interest="Casual"
    )

    interest3 = Interest(
        interest="DPS"
    )

    interest4 = Interest(
        interest="Support/Healer"
    )

    interest5 = Interest(
        interest="Tank"
    )

    interest6 = Interest(
        interest="Flex"
    )

    db.session.add_all([interest1, interest2, interest3,
                       interest4, interest5, interest6])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_interests():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.interests RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM interests"))

    db.session.commit()
