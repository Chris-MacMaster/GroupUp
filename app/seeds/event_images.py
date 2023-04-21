from app.models import db, EventImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_event_images():
    event_img1 = EventImage(
        event_id = 1,
        url="https://images.pexels.com/photos/5598288/pexels-photo-5598288.jpeg"
    )

    event_img2 = EventImage(
        event_id=2,
        url="https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg"
    )

    event_img3 = EventImage(
        event_id=2,
        url="https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg"
    )

    db.session.add_all([event_img1, event_img2, event_img3])

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_event_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.event_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM event_images"))

    db.session.commit()
