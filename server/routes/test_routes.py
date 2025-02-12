import requests
from flask import Blueprint, redirect, render_template, url_for, jsonify
import app_config

test_bp = Blueprint("test_bp", __name__)

@test_bp.route("/test")
def test():
    from app import auth
    
    token = auth.get_token_for_user(app_config.SCOPE)
    if "error" in token:
        return jsonify({"error": "Authentication failed"}), 401

    return jsonify({"message": "hello"})
