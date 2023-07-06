from flask import Blueprint, jsonify, redirect, request
from app.models import db, Group, Event, user_events, event_themes, User, Theme, EventImage, Interest, user_interests
from flask_login import current_user, login_required
import copy
from datetime import datetime
from app.forms import CreateEventForm

search_routes = Blueprint('/all-search', __name__)


@search_routes.route('/groups', methods=['GET'])
def get_all_group_search():
    """Returns all group and event search results"""
    if request.method == "GET":
        groups = Group.query.all()
        groups_copy = copy.deepcopy(groups)
        payload = {group.id: group.to_dict() for group in groups_copy}
        return payload, 200
    

@search_routes.route('/events', methods=['GET'])
def get_all_event_search():
    """Returns all group and event search results"""
    if request.method == "GET":
        events = Event.query.all()
        events_copy = copy.deepcopy(events)
        payload = {event.id: event.to_dict() for event in events_copy}
        return payload, 200

    