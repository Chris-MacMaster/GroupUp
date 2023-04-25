from flask import Blueprint, jsonify, redirect, request
from app.models import db, Event, user_events, event_themes, User, Theme, EventImage, Interest, user_interests
from flask_login import current_user, login_required
import copy
from datetime import datetime
from app.forms import CreateEventForm

interest_routes = Blueprint('/all-interests', __name__)


@interest_routes.route('/', methods=['GET', 'DELETE', 'PUT'])
def get_all_interets():
    """Returns the Interests of User"""
    if request.method == 'GET':
        interests = Interest.query.join(user_interests).filter(user_interests.c.user_id == current_user.id).all()
        if user_interests == None:
            return {'errors': "Cannot find interests with specified id"}
        else:
            interests_copy = copy.deepcopy(interests)
            payload = {interest.id: interest.to_dict() for interest in interests_copy}


            return payload, 200

    # this delete isn't getting hit because of route above right?
    # elif request.method == 'DELETE':
    #     if current_user.is_authenticated:
    #         event = Event.query.get(event_id)
    #         if event == None:
    #             return {'errors': "Cannot find event with specified id"}
    #         # insert owner validation or front end conditional displays?
    #         else:
    #             db.session.delete(event)
    #             db.session.commit()
    #             return event.to_dict(), 200
    #     return {'errors': 'Not authenticated'}
    # elif request.method == 'PUT':
    #     if current_user.is_authenticated:
    #         event = Event.query.get(event_id)
    #         form = CreateEventForm()
    #         form['csrf_token'].data = request.cookies['csrf_token']
    #         if form.validate_on_submit():
    #             event.name = form.data["name"],
    #             event.details = form.data["details"],
    #             event.num_going = form.data["num_going"],
    #             event.group_limit = form.data["group_limit"],
    #             event.host = form.data["host"],
    #             event.format = form.data["format"],
    #             event.description = form.data["description"],
    #             event.date = form.data["date"],
    #             event.strangers = form.data["strangers"],
    #             event.online = form.data["online"],
    #             event.saved = form.data["saved"],
    #             db.session.commit()
    #             return event.to_dict(), 201
    #     return {'errors': 'Not authenticated'}

