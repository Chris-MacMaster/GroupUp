from flask import Blueprint, jsonify, redirect, request
from app.models import db, Group, Shop, ProductImage, ProductReview
from flask_login import current_user, login_required
import copy
from datetime import datetime
##from app.forms import CreateProductForm

group_routes = Blueprint('/groups', __name__)


@group_routes.route('/<int:group_id>/', methods=['GET', 'DELETE', 'PUT'])
def get_one_group(group_id):
    """returns one group with the specified id"""
    print("made to get one group -----------------------------")
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
            pass

            ##ADAPT LATER 
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


@group_routes.route('/', methods=['GET', 'POST'])
def get_all_groups():
    """returns all groups regardless of session"""
    # get groups
    if request.method == "GET":
        groups = Group.query.all()

        productcopy = copy.deepcopy(products)
        # helper function to get associated images of each product

        def get_images(id):
            return ProductImage.query.filter(ProductImage.product_id == id).all()

        def get_reviews(id):
            return ProductReview.query.filter(ProductReview.product_id == id).all()
        payload = {product.id: product.to_dict() for product in productcopy}

        for product in payload.values():
            product_images = get_images(product['id'])
            product['ProductImages'] = [image.to_dict()
                                        for image in product_images]
            review_sum = 0
            reviews = get_reviews(product['id'])
            for review in reviews:
                review_sum += review.stars
            product['avgRating'] = round(
                review_sum / len(reviews), 1) if len(reviews) > 0 else 'New!'
        return payload, 200
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
