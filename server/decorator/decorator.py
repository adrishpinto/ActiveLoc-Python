from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity
from models.user_model import User 

def group_required(allowed_groups):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()
            user = User.objects(id=user_id).first()
            if not user:
                return jsonify({"error": "User not found"}), 404

            if user.group.value not in allowed_groups:
                return jsonify({"msg": "Access denied"}), 403

            return fn(*args, **kwargs)
        return wrapper
    return decorator
