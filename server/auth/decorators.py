from functools import wraps
from flask import jsonify, request
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
          
            verify_jwt_in_request(locations=['cookies'])
            
            current_user_id = get_jwt_identity()
            
        
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({"error": "Authentication required", "details": str(e)}), 401
    return decorated_function