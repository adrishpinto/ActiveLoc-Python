from flask import Blueprint, request, jsonify
from models.requirements_model import Requirements
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator.decorator import group_required
from datetime import datetime, timezone
from extensions import cache
from models.user_model import User
customer_bp = Blueprint('customer_bp', __name__)

from bson import ObjectId
from datetime import datetime
from flask import Blueprint, request, jsonify
from models.requirements_model import Requirements
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator.decorator import group_required

customer_bp = Blueprint('customer_bp', __name__)

@customer_bp.route("/requirements_form", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def req_capture():
    user_id = get_jwt_identity()
    data = request.json

    try:
        requirement_data = {
            "title": data.get("title"),
            "description": data.get("description"),
            "deadline": data.get("deadline",None),
            "created_at": datetime.now(),
            "approved": False,
            "customer_name": data.get("customer_name"),
            "contact_person": data.get("contact_person"),
            "email": data.get("email"),
            "phone_number": data.get("phone_number"),
            "city": data.get("city"),
            "country": data.get("country"),
            "service_type": data.get("service_type"),
            "preferred_start_date": data.get("preferred_start_date", None),      
            "budget": float(data.get("budget", 0)) if data.get("budget", "").strip() != "" else 0, 
            "file_link": data.get("file_link"),
            "urgent": data.get("urgent"),
            "one_time": data.get("one_time"),
            "quality": data.get("quality"),
            "status": "Draft"
        }

      
        requirement = Requirements(**requirement_data)
        requirement.save()

        return jsonify({
            "message": "Requirements submitted successfully",
            "id": str(requirement.id)
        }), 201

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500



@customer_bp.route("/get-requirement/<string:requirement_id>", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def get_requirement(requirement_id):
    try:
        # Find the requirement by its ID
        requirement = Requirements.objects(id=requirement_id).first()

        if not requirement:
            return jsonify({"message": "Requirement not found"}), 404


        requirement_data = requirement.to_mongo().to_dict()

        requirement_data["_id"] = str(requirement_data["_id"])
        
        for field in ["deadline", "created_at", "preferred_start_date"]:
            if field in requirement_data and isinstance(requirement_data[field], datetime):
               requirement_data[field] = requirement_data[field].strftime('%Y-%m-%d')


        return jsonify({"requirement": requirement_data}), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500




@customer_bp.route("/get-requirements", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def get_all_requirements():
    try:
       
        requirements = Requirements.objects.all()

        requirement_list = []
        
        for requirement in requirements:
           
            requirement_data = requirement.to_mongo().to_dict()
            
            if "_id" in requirement_data:
                requirement_data["_id"] = str(requirement_data["_id"])  
            
            # Convert datetime fields to ISO format
            for field in ["deadline", "created_at", "preferred_start_date"]:
                if field in requirement_data and isinstance(requirement_data[field], datetime):
                    requirement_data[field] = requirement_data[field].isoformat()

            requirement_list.append(requirement_data)

        return jsonify({"requirements": requirement_list}), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500
    
    
@customer_bp.route("/requirements/<string:requirement_id>", methods=["PUT"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def update_requirement(requirement_id):
    user_id = get_jwt_identity()  # Get the user ID from the JWT token
    data = request.json

  
    requirement = Requirements.objects(id=requirement_id).first()
    if not requirement:
        return jsonify({'error': 'Requirement not found'}), 404

    
    if "created_at" in data:
        del data["created_at"]

    
    user = User.objects(id=user_id).first()
    if user:
        print(user.email)
        data['quote_by'] = user.email  

    # Update fields in the requirement
    for field in data:
     if field in Requirements._fields:
        if field == 'budget':
            try:
                data['budget'] = float(data.get('budget', 0))
            except ValueError:
                data['budget'] = None 

        setattr(requirement, field, data[field])

    requirement.save()
    return jsonify({'message': 'Requirement updated successfully'})



@customer_bp.route("/delete-requirement/<requirement_id>", methods=["DELETE"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def delete_requirement(requirement_id):
    try:
        requirement = Requirements.objects(id=requirement_id).first()
        if not requirement:
            return jsonify({"message": "Requirement not found"}), 404
        
        requirement.delete()
        return jsonify({"message": "Requirement deleted successfully"}), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

