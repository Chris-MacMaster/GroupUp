from flask import Blueprint, jsonify, redirect, request
from app.models import db, Event, user_events, event_themes, User, Theme, EventImage, Group
from flask_login import current_user, login_required
import copy
from datetime import datetime
from app.forms import CreateEventForm

event_routes = Blueprint('/all-events', __name__)


@event_routes.route('/<int:event_id>/', methods=['GET', 'DELETE', 'PUT'])
def get_one_event(event_id):
    """Returns one event with the specified id"""
    if request.method == 'GET':
        event = Event.query.get(event_id)
        if event == None:
            return {'errors': "Cannot find event with specified id"}
        else:
            event_dict = event.to_dict()

            themes = Theme.query.join(event_themes).filter(event_themes.c.event_id == event_id).all()
            users = User.query.join(user_events).filter(user_events.c.event_id == event_id).all()
            event_images = EventImage.query.filter(EventImage.event_id == event_id).all()
            group = Group.query.get(event.group_id)

            themes_copy = copy.deepcopy(themes)
            payload = {theme.id: theme.to_dict() for theme in themes_copy}

            users_copy = copy.deepcopy(users)
            payload_users = {user.id: user.to_dict() for user in users_copy}

            event_images_copy = copy.deepcopy(event_images)
            payload_event_image = {event_image.id: event_image.to_dict() for event_image in event_images_copy}

            event_dict["Themes"] = payload
            event_dict["Users"] = payload_users
            # later can refactor to include multiple images, you're not even using images yet
            event_dict["EventImage"] = payload_event_image
            event_dict["Group"] = group.to_dict()

            return event_dict, 200

    # this delete isn't getting hit because of route above right?
    elif request.method == 'DELETE':
        if current_user.is_authenticated:
            event = Event.query.get(event_id)
            if event == None:
                return {'errors': "Cannot find event with specified id"}
            # insert owner validation or front end conditional displays?
            else:
                db.session.delete(event)
                db.session.commit()
                return event.to_dict(), 200
        return {'errors': 'Not authenticated'}
    elif request.method == 'PUT':
        if current_user.is_authenticated:
            event = Event.query.get(event_id)
            form = CreateEventForm()
            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                event.name = form.data["name"],
                event.details = form.data["details"],
                event.num_going = form.data["num_going"],
                event.group_limit = form.data["group_limit"],
                event.host = form.data["host"],
                event.format = form.data["format"],
                event.description = form.data["description"],
                event.date = form.data["date"],
                event.strangers = form.data["strangers"],
                event.online = form.data["online"],
                event.saved = form.data["saved"],
                db.session.commit()
                return event.to_dict(), 201
        return {'errors': 'Not authenticated'}


@event_routes.route('/', methods=['GET', 'POST'])
def get_all_events():
    """Returns all events regardless of session"""
    if request.method == "GET":
        events = Event.query.all()
        events_copy = copy.deepcopy(events)
        payload = {event.id: event.to_dict() for event in events_copy}
        return payload, 200

    elif request.method == "POST":
        """Posts a new event"""
        form = CreateEventForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        # if not form.validate_on_submit():
        #     # pass
        #     raise ValueError("Failed flask form validation")
        if form.validate_on_submit():
            new_event = Event(
                name=form.data["name"],
                details=form.data["details"],
                num_going=form.data["num_going"],
                group_limit=form.data["group_limit"],
                host=form.data["host"],
                format=form.data["format"],
                description=form.data["description"],
                date=form.data["date"],
                strangers=form.data["strangers"],
                online=form.data["online"],
                saved=form.data["saved"],
            )
            db.session.add(new_event)
            db.session.commit()

            return new_event.to_dict(), 201
        return {'errors': 'Not authenticated'}


@event_routes.route('/current/user-events', methods=['GET'])
def get_current_events():
    """Returns all groups user is a member of"""
    if request.method == "GET":
        associated_events = Event.query.join(user_events).filter(
            user_events.c.user_id == current_user.id).all()
        # return owned_groups.to_dict()
        events_copy = copy.deepcopy(associated_events)
        payload = {event.id: event.to_dict() for event in events_copy}
        # return owned_groups
        return payload, 200
