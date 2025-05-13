from flask import Blueprint, request, jsonify, make_response  # Removed `session`
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity, unset_jwt_cookies # JWT for authentication
from datetime import timedelta 
from models.user_model import User  
from mongoengine.errors import NotUniqueError, ValidationError
from werkzeug.security import generate_password_hash
from flask_wtf.csrf import generate_csrf
from flask_mail import Message
import random
from extensions import cache
from flask import jsonify, request
from flask_jwt_extended import (
    create_access_token,
    set_access_cookies
)
from flask import jsonify, request
from datetime import timedelta
from flask_jwt_extended import create_access_token, set_access_cookies
from werkzeug.security import check_password_hash
from extensions import mail
from decorator.decorator import group_required

user_bp = Blueprint("user", __name__)
@user_bp.route("/users", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def get_users():
    try:
        current_user = get_jwt_identity()

        users = User.objects()
        sorted_users = sorted(users, key=lambda u: u.first_name.lower() if u.first_name else "")

        user_list = []
        for user in sorted_users:
            base = {
                "_id": str(user.id),
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "group": user.group.value if user.group else None, 
                "status": user.status,
                "permission": user.permission.value if hasattr(user.permission, "value") else user.permission,
            }

            common_fields = [
                "phone_number", "city", "country", "company_name", "billing_currency", 
                "type", "organization_name", "billing_address", "tax_id", "pan_number", 
                "standard_rate", "services_offered", "created_by"
            ]
            for field in common_fields:
                value = getattr(user, field, None)
                if value is not None:
                    base[field] = value

            user_list.append(base)

        return jsonify({"current_user": current_user, "users": user_list}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500




@user_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Email and password are required"}), 400

        user = User.objects(email=email).first()

        if user and check_password_hash(user.password, password):
            expires = timedelta(hours=1)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            user_group = getattr(user.group, 'value', "No Group")
            
            response = jsonify({
                "message": "Login successful",
                "user_id": str(user.id),
                "email": email,
                "group": user_group
            })
            
            set_access_cookies(response, access_token)
            return response

        return jsonify({"error": "Invalid email or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
    
@user_bp.route("/logout", methods=["POST"])
def logout():
    try:
        response = jsonify({"message": "Logout successful"})
        unset_jwt_cookies(response)
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@user_bp.route("/edit_user/<user_id>", methods=["PUT"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def edit_user(user_id):
    try:
        data = request.get_json()

        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        updatable_fields = [
            'email', 'password', 'first_name', 'last_name',
            'group', 'status', 'permission',
            'phone_number', 'city', 'country',
            'type', 'organization_name', 'billing_address',
            'tax_id', 'pan_number', 'billing_currency',
            'standard_rate', 'services_offered', 'custom_service', 'created_by'
        ]

        if "email" in data and data["email"] != user.email:
            if User.objects(email=data["email"]).first():
                return jsonify({'error': 'Email already in use'}), 400

        for field in updatable_fields:
            if field in data:
                if field == 'password':
                    setattr(user, field, generate_password_hash(data[field]))
                elif field in ["country", "city", "organization_name"]:
                    setattr(user, field, data[field].title())
                else:
                    setattr(user, field, data[field])
        
        if 'type' in data:
            if data['type'] == 'Business' and 'organization_name' not in data:
                return jsonify({'error': 'Organization name is required for Business type'}), 400

        user.validate()
        user.save()

        return jsonify({'message': 'User updated successfully'}), 200

    except ValidationError as e:
        return jsonify({'error': 'Validation error', 'details': str(e)}), 400

    except Exception as e:
        print(str(e))
        return jsonify({'error': 'An unexpected error occurred', }), 500
        


  
@user_bp.route("/add-user", methods=["POST"])
def create_user():
    try:
        data = request.get_json()
        required_fields = ["email", "password", "first_name", "last_name", "group", "status"]

        missing_fields = [field for field in required_fields if field not in data or not data[field]]
        if missing_fields:
            return jsonify({
                "error": "All required fields must be provided",
                "missing_fields": missing_fields
            }), 400

        hashed_password = generate_password_hash(data["password"])

        # Start with common user fields
        user_data = {
            "email": data["email"],
            "password": hashed_password,
            "first_name": data["first_name"],
            "last_name": data["last_name"],
            "group": data["group"],
            "status": data["status"],
            "permission": data.get("permission", ""),
        }

        # Add optional fields for both Customer and Vendor
        optional_fields = ["phone_number", "city", "country", "company_name", "billing_currency", 
                           "type", "organization_name", "billing_address", "tax_id", "pan_number"]
        for field in optional_fields:
            if field in data and data[field]:
                user_data[field] = data[field]

        # Add vendor-specific fields
        if data["group"] == "Vendor":
            vendor_fields = ["standard_rate", "services_offered", "custom_service"]
            for field in vendor_fields:
                if field in data and data[field]:
                    user_data[field] = data[field]

        # Add customer-specific fields
        if data["group"] == "Customer":
            if "created_by" in data and data["created_by"]:
                user_data["created_by"] = data["created_by"]

        user = User(**user_data)
        user.validate()
        user.save()

        customer_name = f"{user.first_name} {user.last_name}"
        customer_email = user.email
        customer_password = data["password"]
        portal_link = "https://tms.activeloc.com/"  # <-- Replace with your actual portal link

        msg = Message(
            subject="Welcome to ActiveLoc TMS! Here are Your Account Details",
            recipients=[customer_email],
            body=f"""Dear {customer_name},

Welcome to ActiveLoc TMS!
Your account has been successfully created.

Login Credentials:
Username: {customer_email}
Password: {customer_password}

We're excited to support your translation, localization, and staffing needs.

Login Link: {portal_link}

Regards,
ActiveLoc TMS Support Team
"""
        )
        mail.send(msg)
        # ----------------------------------------

        return jsonify({
            "message": "User created successfully",
            "user_id": str(user.id)
        }), 201

    except NotUniqueError:
        return jsonify({"error": "User with this email already exists"}), 409

    except ValidationError as e:
        return jsonify({"error": "Validation error", "details": str(e)}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    



@user_bp.route("/delete-user/<user_id>", methods=["DELETE"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def delete_user(user_id):
    try:
        user = User.objects(id=user_id).first()
        protected_email = user.email.split("@")
        
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        if protected_email[1] == "activeloc.com":
            return jsonify({"error": "This user cannot be deleted"}), 403

        user.delete()

        return jsonify({
            "message": "User deleted successfully"
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500





@user_bp.route("/send-otp", methods=["POST"])
def send_otp():
    try:
        data = request.get_json()
        email = data.get("email")
        user = User.objects(email=email).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        if not email:
            return jsonify({"error": "Email is required"}), 400

        otp = str(random.randint(100000, 999999))

        cache.set(email, otp, timeout=300) 

        msg = Message(
            subject="Your OTP Code",
            recipients=[email],
            body=f"Your OTP code is: {otp}"
        )
        mail.send(msg)

        return jsonify({"message": "OTP sent successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
    
@user_bp.route("/reset-password", methods=["POST"])
def reset_password():
    try:
        data = request.get_json()
        email = data.get("email")
        otp = data.get("otp")
        new_password = data.get("new_password")

        if not all([email, otp, new_password]):
            return jsonify({"error": "Email, OTP, and new password are required"}), 400

        cached_otp = cache.get(email)
        if cached_otp != otp:
            return jsonify({"error": "Invalid or expired OTP"}), 400

        user = User.objects(email=email).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        user.password = generate_password_hash(new_password)
        user.save()

        cache.delete(email)

        return jsonify({"message": "Password updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@user_bp.route("/user", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations", "Customer","Vendor"])
def get_user_details():
    try:
        user_id = get_jwt_identity()
        user = User.objects(id=user_id).first()

        if not user:
            return jsonify({"error": "User not found"}), 404

       
        response = {
            "user_id": str(user.id),
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "status": user.status,
            "group": user.group.value,
            "permission": user.permission
        }

       
        if user.phone_number:
            response["phone_number"] = user.phone_number
        if user.city:
            response["city"] = user.city
        if user.country:
            response["country"] = user.country
        if user.organization_name:
            response["organization_name"] = user.organization_name

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@user_bp.route("/user/<user_id>", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations", "Customer", "Vendor"])
def get_user_by_id(user_id):
    try:
        user = User.objects(id=user_id).first()

        if not user:
            return jsonify({"error": "User not found"}), 404
        response = {
            "user_id": str(user.id),
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "status": user.status,
            "group": user.group.value,  # assuming Enum
            "permission": user.permission,
        }

        # Optional fields
        if user.phone_number:
            response["phone_number"] = user.phone_number
        if user.city:
            response["city"] = user.city
        if user.country:
            response["country"] = user.country
        if user.organization_name:
            response["organization_name"] = user.organization_name
        if user.billing_address:
            response["billing_address"] = user.billing_address
        if user.tax_id:
            response["tax_id"] = user.tax_id
        if user.pan_number:
            response["pan_number"] = user.pan_number
        if user.billing_currency:
            response["billing_currency"] = user.billing_currency
        if user.type:
            response["type"] = user.type

        # Vendor-specific
        if user.group.value == "Vendor":
            if user.standard_rate:
                response["standard_rate"] = user.standard_rate
            if user.services_offered:
                response["services_offered"] = user.services_offered
            if user.custom_service:
                response["custom_service"] = user.custom_service

        # Customer-specific
        if user.group.value == "Customer":
            if user.created_by:
                response["created_by"] = user.created_by

        # Optional: Include usage if needed
        if user.usage:
            response["usage"] = user.usage


        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

