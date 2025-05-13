# customer_vendor_routes.py
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator.decorator import group_required
from models.user_model import User  # Import the User model
from flask_mail import Message

customer_vendor_bp = Blueprint('customer_vendor', __name__)

# get user list 
@customer_vendor_bp.route("/users-customer", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def get_customers():
    try:
        current_user = get_jwt_identity()
        customers = User.objects(group="Customer")  
        customer_list = [
            {**customer.to_mongo().to_dict(), "_id": str(customer.id)} for customer in customers
        ]
        return jsonify({"current_user": current_user, "customers": customer_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    


@customer_vendor_bp.route("/users-vendor", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def get_vendors():
    try:
        current_user = get_jwt_identity()
        vendors = User.objects(group="Vendor")
        vendor_list = [
            {**vendor.to_mongo().to_dict(), "_id": str(vendor.id)} for vendor in vendors
        ]
        return jsonify({"current_user": current_user, "vendors": vendor_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

