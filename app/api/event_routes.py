from flask import Blueprint, jsonify, redirect, request
from app.models import db, Group
from flask_login import current_user, login_required
import copy
from datetime import datetime
# from app.forms import CreateProductForm

event_routes = Blueprint('/events', __name__)


events_dummy = [{"name":'Meet and Greet',
    "details":'A meetup, introductions.',
    "numGoing":3,
    "groupLimit":5,
    "host":'Tank Lovers',
    "format":'Intros, then food, then adjourned.',
    "description":'A chance to meet as a team before playing. Still need another 2',
    "date":'11/20/23',
    "strangers":True,
    "online":False,
    "groupId":1,
    "saved":False},

    {"name":'Casual Comp',
    "details":'Comp without the yelling.',
    "numGoing":3,
    "groupLimit":5,
    "host":'Tank Lovers',
    "format":'Gameplay session for the team from our last event, "Meet and Greet".',
    "description":'We go win.',
    "date":'11/21/23',
    "strangers":False,
    "online":True,
    "groupId":1,
    "saved":False},

    {"name":'Park Visit',
    "details":'A chance to touch grass.',
    "numGoing":1,
    "groupLimit":10,
    "host":'Doctors that No One Guards',
    "format":'A walk in the local park',
    "description":'About a 15 minute stroll around the park as a change of pace.',
    "date":'08/12/23',
    "strangers":True,
    "online":True,
    "groupId":2,
    "saved":False}]


@event_routes.route('/<int:event_id>/', methods=['GET', 'DELETE', 'PUT'])
def get_one_event(event_id):
    """returns one group with the specified id"""
    # print("made to get one group -----------------------------")
    # dummy data
 
    return events_dummy[event_id-1]

    if request.method == 'GET':
        group = Group.query.get(group_id)
        if group == None:
            return {'errors': "Cannot find group with specified id"}
        else:
            group_dict = group.to_dict()
            return group_dict  # insert code

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
            pass

            # ADAPT LATER
            # group = Group.query.get(group_id)
            # # form = CreateProductForm()  # make edit form
            # # form['csrf_token'].data = request.cookies['csrf_token']
            # # if form.validate_on_submit():
            # #     product.shop_id = form.data["shop_id"]
            # #     product.name = form.data["name"]
            # #     product.description = form.data["description"]
            # #     product.category = form.data["category"]
            # #     product.available = form.data["available"]
            # #     product.free_shipping = form.data["free_shipping"]
            # #     product.price = form.data["price"]
            # #     db.session.commit()
            #     # addnig an associated image for the newly created product
            #     product_image = ProductImage.query.filter(
            #         ProductImage.product_id == product_id).all()
            #     first_img = product_image[0]
            #     for img in product_image:
            #         if img.id < first_img.id:
            #             first_img = img

            #     first_img.url = form.data["url"]
            #     db.session.commit()
            #     return product.to_dict(), 201


@event_routes.route('/', methods=['GET', 'POST'])
def get_all_events():
    """returns all groups regardless of session"""
    # get groups
    if request.method == "GET":
        # dummy data for now
        return events_dummy

        groups = Group.query.all()

        groups_copy = copy.deepcopy(groups)

        return groups_copy, 200

    # POSTS NEW PRODUCT
    elif request.method == "POST":
        # print('PAST METHOD CHECKER ------------------------------')
        form = CreateProductForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if not form.validate_on_submit():
            # pass
            raise ValueError("Failed flask form validation")
        if form.validate_on_submit():
            new_product = Product(
                shop_id=form.data["shop_id"],
                name=form.data["name"],
                description=form.data["description"],
                category=form.data["category"],
                available=form.data["available"],
                free_shipping=form.data["free_shipping"],
                price=form.data["price"]
            )
            db.session.add(new_product)
            db.session.commit()
            # addnig an associated image for the newly created product
            new_product_list = Product.query.all()
            new_product = new_product_list[-1]
            new_product_img = ProductImage(
                url=form.data["url"],
                product_id=new_product.id,
            )
            db.session.add(new_product_img)
            db.session.commit()

            return new_product.to_dict(), 201
