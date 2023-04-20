from app.models import db, Theme, environment, SCHEMA
from sqlalchemy.sql import text


def seed_themes():
    theme1 = Theme(
        theme="Competitive"
    )

    theme2 = Theme(
        theme="Casual"
    )

    theme3 = Theme(
        theme="DPS"
    )

    theme4 = Theme(
        theme="Support/Healer"
    )

    theme5 = Theme(
        theme="Tank"
    )

    theme6 = Theme(
        theme="Flex"
    )

    db.session.add_all([theme1, theme2, theme3,
                       theme4, theme5, theme6])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_themes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.themes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM themes"))

    db.session.commit()
