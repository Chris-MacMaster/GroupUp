from flask.cli import AppGroup
from .users import seed_users, undo_users
from .groups import seed_groups, undo_groups
from .events import seed_events, undo_events
from .event_images import seed_event_images, undo_event_images
from .interests import seed_interests, undo_interests
from .themes import seed_themes, undo_themes
from .categories import seed_categories, undo_categories

from .user_interests import seed_user_interests, undo_user_interests
from .user_groups import seed_user_groups, undo_user_groups
from .user_events import seed_user_events, undo_user_events

from .group_categories import seed_group_categories, undo_group_categories
from .event_themes import seed_event_themes, undo_event_themes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_groups()
        undo_events()
        undo_event_images()
        undo_interests()
        undo_categories()
        undo_themes()
        undo_user_groups()
        undo_user_events()
        undo_user_interests()
        undo_group_categories()
        undo_event_themes()
    seed_users()
    seed_groups()
    seed_events()
    seed_event_images()
    seed_interests()
    seed_categories()
    seed_themes()
    seed_user_groups()
    seed_user_events()
    seed_user_interests()
    seed_group_categories()
    seed_event_themes()
    
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_groups()
    undo_events()
    undo_event_images()
    undo_interests()
    undo_categories()
    undo_themes()
    undo_user_groups()
    undo_user_events()
    undo_user_interests()
    undo_group_categories()
    undo_event_themes()
    # Add other undo functions here