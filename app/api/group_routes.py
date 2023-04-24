from flask import Blueprint, jsonify, redirect, request
from app.models import db, Group, user_groups, User
from flask_login import current_user, login_required
import copy
from datetime import datetime
from app.forms import CreateGroupForm
##from app.forms import CreateProductForm

group_routes = Blueprint('/all-groups', __name__)

@group_routes.route('/<int:group_id>/', methods=['GET', 'DELETE', 'PUT'])
def get_one_group(group_id):
    """Returns one group with the specified id"""
    if request.method == 'GET':
        group = Group.query.get(group_id)
        if group == None:
            return {'errors': "Cannot find group with specified id"}
        else: 
            group_dict = group.to_dict()
            return group_dict ##insert code
 

    # this delete isn't getting hit because of route above right?
    elif request.method == 'DELETE':
        if current_user.is_authenticated:
            group = Group.query.get(group_id)
            if group == None:
                return {'errors': "Cannot find group with specified id"}
            # insert owner validation or front end conditional displays?
            else:
                db.session.delete(group)
                db.session.commit()
                return group.to_dict(), 200
        return {'errors': 'Not authenticated'}
    elif request.method == 'PUT':

        if current_user.is_authenticated:
            group = Group.query.get(group_id)
            form = CreateGroupForm()

            form['csrf_token'].data = request.cookies['csrf_token']
            if form.validate_on_submit():
                group.name = form.data['name']
                group.description = form.data['description']
                group.img_url = form.data['img_url']
                group.organizer = form.data['organizer']
                group.num_members = form.data['num_members']

                db.session.commit()
                return group.to_dict(), 201
        return {'errors': 'Not authenticated'}



          


@group_routes.route('/', methods=['GET', 'POST'])
def get_all_groups():
    """Returns all groups regardless of session"""
    if request.method == "GET":
        groups = Group.query.all()
        groups_copy = copy.deepcopy(groups)
        payload = { group.id: group.to_dict() for group in groups_copy}
        return payload, 200

    elif request.method == "POST":
        """Posts a new group"""
        form = CreateGroupForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        # if not form.validate_on_submit():
        #     # pass
        #     raise ValueError("Failed flask form validation")
        if form.validate_on_submit():
            new_group = Group(
                name=form.data["name"],
                description=form.data["description"],
                img_url=form.data["img_url"],
                organizer=form.data["organizer"],
                num_members=form.data["num_members"],
            )
            db.session.add(new_group)
            db.session.commit()

            return new_group.to_dict(), 201
        return {'errors': 'Not authenticated'}


@group_routes.route('/current/user-groups', methods=['GET'])
def get_current_groups():
    """Returns all groups user is a member of"""
    if request.method == "GET":
        owned_groups = Group.query.join(user_groups).filter(user_groups.c.user_id == current_user.id).all()
        # return owned_groups.to_dict()
        groups_copy = copy.deepcopy(owned_groups)
        payload = {group.id: group.to_dict() for group in groups_copy}
        # return owned_groups
        return payload, 200