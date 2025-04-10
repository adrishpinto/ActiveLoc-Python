from flask import Blueprint, request, jsonify, make_response  # Removed `session`
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity, unset_jwt_cookies # JWT for authentication
from datetime import timedelta  # Set token expiration
from models.user_model import User  # Import User model
from mongoengine.errors import NotUniqueError, ValidationError
from werkzeug.security import generate_password_hash
from flask_wtf.csrf import generate_csrf
from flask import jsonify, request
from flask_jwt_extended import (
    create_access_token,
    set_access_cookies
)

from flask import jsonify, request
from datetime import timedelta
from flask_jwt_extended import create_access_token, set_access_cookies

user_bp = Blueprint("user", __name__)



@user_bp.route("/users", methods=["GET"])
@jwt_required()
def get_users():
    try:
        current_user = get_jwt_identity()
        users = User.objects()
        user_list = [
            {**user.to_mongo().to_dict(), "_id": str(user.id)} for user in users
        ]
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

        user = User.objects(email=email, password=password).first()

        if user:
            expires = timedelta(hours=1)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)

            response = jsonify({
                "message": "Login successful",
                "user_id": str(user.id),
                "email": email
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
def edit_user(user_id):
    try:
        data = request.get_json()
        
        # Find the user by ID
        user = User.objects(id=user_id).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        
        updatable_fields = ['email', 'password', 'first_name', 'group', 'last_name',
                            'customer_id', 'customer_code', 'access_level', 
                            'customer_type', 'company_name', 'form_filled']
        
        for field in updatable_fields:
            if field in data:
                if field == 'password':
                    setattr(user, field, generate_password_hash(data[field]))
                else:
                    setattr(user, field, data[field])
        
        # Save updated user
        user.validate()
        user.save()
        
        return jsonify({'message': 'User updated successfully'}), 200
    
    except ValidationError as e:
        return jsonify({'error': 'Validation error', 'details': str(e)}), 400
    
    except Exception as e:
        return jsonify({'error': 'An unexpected error occurred', 'details': str(e)}), 500

    
@user_bp.route("/user", methods=["GET"])
@jwt_required()  
def get_user_details():
    try:
        user_id = get_jwt_identity()
        user = User.objects(id=user_id).first()  
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({
            "user_id": str(user.id),
            "first_name": user.first_name,
            "email": user.email,
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

