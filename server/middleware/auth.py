from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from functools import wraps

def auth_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()  # 🔹 Check if JWT is present and valid
            return fn(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Unauthorized access", "message": str(e)}), 401
    return wrapper
