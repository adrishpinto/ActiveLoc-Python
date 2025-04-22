from flask import Blueprint, request, jsonify
from models.requirements_model import Requirements
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator.decorator import group_required
from datetime import datetime, timezone
from extensions import cache

customer_bp = Blueprint('customer_bp', __name__)

@customer_bp.route("/requirements_form", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def req_capture():
    user_id = get_jwt_identity()
    title = request.json.get("title")
    description = request.json.get("description")
    deadline = request.json.get("deadline")

    if not title or not deadline:
        return jsonify({"message": "Title and Deadline are required."}), 400

    url = request.json.get("blob_url")

    try:
        requirement = Requirements(
            title=title,
            description=description,
            deadline=datetime.fromisoformat(deadline),
            created_at=datetime.now(timezone.utc),
            approved=False,
            blob_url=url
        )
        requirement.save()

        return jsonify({"message": "Requirements submitted successfully", "data": {
            "id": str(requirement.id),
            "title": requirement.title,
            "description": requirement.description,
            "deadline": requirement.deadline,
            "created_at": requirement.created_at,
            "approved": requirement.approved,
            "blob_url": requirement.blob_url
        }}), 201

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500



@customer_bp.route("/get-requirements", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def get_all_requirements():
    try: 
        requirements = Requirements.objects.all()

        
        requirement_list = [{
            "id": str(requirement.id),
            "title": requirement.title,
            "description": requirement.description,
            "deadline": requirement.deadline,
            "created_at": requirement.created_at,
            "approved": requirement.approved,
            "blob_url": requirement.blob_url
        } for requirement in requirements]

        return jsonify({"requirements": requirement_list}), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500