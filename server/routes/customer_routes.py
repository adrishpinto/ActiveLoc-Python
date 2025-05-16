from flask import Blueprint, request, jsonify
from models.requirements_model import Requirements
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator.decorator import group_required
from datetime import datetime, timezone
from extensions import cache
from models.user_model import User
from flask import render_template, make_response, current_app
import os 
from extensions import mail
from datetime import datetime
from flask import Blueprint, request, jsonify
from models.requirements_model import Requirements
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator.decorator import group_required
import pdfkit
from weasyprint import HTML
import gc
from datetime import datetime, timedelta
from flask_mail import Message
from models.requirements_model import Vendor
import pytz


customer_bp = Blueprint('customer_bp', __name__)

@customer_bp.route("/requirements_form", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations","Customer"])
def req_capture():
    user_id = get_jwt_identity()
    data = request.json
    
    preferred_start_date = data.get("preferred_start_date")
    if preferred_start_date:
            preferred_start_date = datetime.fromisoformat(preferred_start_date)

    deadline = data.get("deadline")
    if deadline:
        deadline = datetime.fromisoformat(deadline)

    try:
        requirement_data = {
            "title": data.get("title"),
            "description": data.get("description"),
            "created_at": datetime.now(),
            "approved": "pending",
            "customer_name": data.get("customer_name"),
            "contact_person": data.get("contact_person"),
            "email": data.get("email"),
            "phone_number": data.get("phone_number"),
            "city": data.get("city"),
            "country": data.get("country"),
            "service_type": data.get("service_type"),
            "preferred_start_date": preferred_start_date or None,
            "deadline": deadline or None,      
            "budget": float(data.get("budget", 0)) if data.get("budget", "").strip() != "" else 0, 
            "file_link": data.get("file_link"),
            "urgent": data.get("urgent"),
            "quality": data.get("quality"),
            "users": [user_id],
            "quotation_deadline":None,
            "countdown" : 0,
            "status": "Draft"
        }
        print(user_id)

        requirement = Requirements(**requirement_data)
        requirement.save()
        
        if getattr(requirement, 'preferred_start_date', None) and getattr(requirement, 'deadline', None):
            deadline_str = requirement.deadline.strftime('%Y-%m-%d')
            preferred_start_date_str = requirement.preferred_start_date.strftime('%Y-%m-%d')
            date_diff = calculate_date(deadline_str, preferred_start_date_str)
            requirement.date_diff = date_diff
            requirement.save()

        # --------- SEND THANK YOU EMAIL TO CUSTOMER ---------
        customer_name = requirement.customer_name or "Customer"
        customer_email = requirement.email

        msg_customer = Message(
            subject="Thank You for Submitting Your Requirement!",
            recipients=[customer_email],
            body=f"""Dear {customer_name},

Thank you for sharing your service requirement with us.
Our sales representative will review the details and reach out to you shortly to discuss the next steps.

If you have any immediate queries, feel free to reply to this email.

Regards,
ActiveLoc Sales Team
"""
        )
        mail.send(msg_customer)

        # --------- SEND NOTIFICATION EMAIL TO INTERNAL TEAM ---------
        internal_team_email = "sales-team@activeloc.com"  

        service_type = requirement.service_type or "N/A"
        language_pair = requirement.description or "N/A" 
        volume = f"{requirement.budget} words" if requirement.budget else "N/A"

        msg_team = Message(
            subject=f"New Customer Requirement Received - {customer_name}",
            recipients=[internal_team_email],
            body=f"""Hi Team,

A new requirement has been submitted by {customer_name}.

Summary:
Service Type: {service_type}
Language Pair: {language_pair}
Volume: {volume}

Please login to the portal to review the full details and initiate follow-up.

Regards,
System Notification
"""
        )
        mail.send(msg_team)
        # ------------------------------------------------------------

        return jsonify({
            "message": "Requirements submitted successfully",
            "id": str(requirement.id)
        }), 201

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500




@customer_bp.route("/get-requirement/<string:requirement_id>", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations","Customer"])
def get_requirement(requirement_id):
    try:
        # Find the requirement by its ID
        requirement = Requirements.objects(id=requirement_id).first()

        if not requirement:
            return jsonify({"message": "Requirement not found"}), 404

        requirement_data = requirement.to_mongo().to_dict()
        
        if "user" in requirement_data and requirement_data["user"]:
                 requirement_data["user"] = str(requirement_data["user"]) 

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
            
        
            if "user" in requirement_data and requirement_data["user"]:
                 requirement_data["user"] = str(requirement_data["user"]) 
                 
            
            
            # Convert datetime fields to ISO format
            for field in ["deadline", "created_at", "preferred_start_date"]:
                if field in requirement_data and isinstance(requirement_data[field], datetime):
                    requirement_data[field] = requirement_data[field].isoformat()

            requirement_list.append(requirement_data)

        return jsonify({"requirements": requirement_list}), 200

    except Exception as e:
        print(str(e))
        return jsonify({"message": f"Error: {str(e)}"}), 500
        
    
    
    
from bson import ObjectId

@customer_bp.route("/get-requirements-user", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations","Customer","Vendor"])
def get_user_requirements_user():
    try:
        user_id = get_jwt_identity()  

        requirements = Requirements.objects(__raw__={
            "users": user_id 
        })        
        
        requirement_list = [] 
        
        for requirement in requirements:
            requirement_data = requirement.to_mongo().to_dict()

            if "_id" in requirement_data:
                requirement_data["_id"] = str(requirement_data["_id"])

            # Convert user_id (ObjectId) to string for JSON serialization
            if "user" in requirement_data and requirement_data["user"]:
                requirement_data["user"] = str(requirement_data["user"])  
            
            for field in ["deadline", "created_at", "preferred_start_date"]:
                if field in requirement_data and isinstance(requirement_data[field], datetime):
                    requirement_data[field] = requirement_data[field].isoformat()
            

            requirement_list.append(requirement_data)

        return jsonify({"requirements": requirement_list}), 200

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500



from models.user_model import User
from .utils.utils import calculate_vendor_total_in_inr, get_conversion_rate

@customer_bp.route("/requirements/<string:requirement_id>", methods=["PUT"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def update_requirement(requirement_id):
    user_id = get_jwt_identity()  
    user = User.objects(id=user_id).first() 
    email = user.email
    data = request.json

    print(f"Received update for requirement ID: {requirement_id}")
    print("Request JSON data:", data)

    requirement = Requirements.objects(id=requirement_id).first()
    if not requirement:
        print("Requirement not found.")
        return jsonify({'error': 'Requirement not found'}), 404

    if "vendors" in data:
        print("Ignoring vendors field in the update")
        del data["vendors"]

    if "created_at" in data:
        print("Removing 'created_at' from data")
        del data["created_at"]
        
    if getattr(requirement, 'preferred_start_date', None) and getattr(requirement, 'deadline', None):
        deadline_str = requirement.deadline.strftime('%Y-%m-%d')
        preferred_start_date_str = requirement.preferred_start_date.strftime('%Y-%m-%d')
        date_diff = calculate_date(deadline_str, preferred_start_date_str)
        requirement.date_diff = date_diff
    else:
        print('Start date or deadline missing, skipping date_diff calculation.')

    requirement.quote_by = email

    for field, value in data.items():
        print(f"Processing field: {field} with value: {value}")
        
        if field in Requirements._fields:
            try:
                if field in ['budget', 'rate', 'units','profit','pm_profit','pm_rate','pm_hours']:
                    setattr(requirement, field, float(value))
                elif field == 'countdown':
                    countdown = int(value)
                    requirement.countdown = countdown
                    utc_now = datetime.now(pytz.utc)
                    requirement.quotation_deadline = utc_now + timedelta(hours=countdown + 1)
                elif field == 'date_diff':
                    setattr(requirement, field, int(value))
                elif field == 'urgent':
                    if value not in ["normal", "urgent", "express"]:
                        print(f"Invalid urgent value: {value}")
                        return jsonify({'error': f'Invalid value for {field}'}), 400
                    setattr(requirement, field, value)
                elif field == 'service_type':
                    if value not in ["Translation", "Localization", "Consulting", "Staffing", "Data Services", "Other"]:
                        print(f"Invalid service_type: {value}")
                        return jsonify({'error': f'Invalid value for {field}'}), 400
                    setattr(requirement, field, value)
                elif field == 'status':
                    if value not in ["Draft", "Submitted"]:
                        print(f"Invalid status: {value}")
                        return jsonify({'error': f'Invalid value for {field}'}), 400
                    setattr(requirement, field, value)
                elif field in ['preferred_start_date', 'deadline']:
                    setattr(requirement, field, datetime.fromisoformat(value))
                    
                elif field == 'project_status':
                    if value not in ["in-progress", "assigned", "delivered", ""]:
                        print(f"Invalid project_status: {value}")
                        return jsonify({'error': 'invalid value'}), 400
                    setattr(requirement, field, value)

                elif field == "user":
                    continue
                elif field == "quotation_deadline":
                    continue
                else:
                    setattr(requirement, field, value or "")
            except Exception as e:
                print(f"Error processing field '{field}': {e}")
                return jsonify({'error': f"Error processing field '{field}': {str(e)}"}), 400
            
    if requirement.rate and requirement.units:
     client_total = requirement.rate * requirement.units
     vendor_total = calculate_vendor_total_in_inr(requirement.vendors)
     requirement.profit = client_total - vendor_total
     print(f"Calculated profit: {requirement.profit}")

    requirement.save()
    print("Requirement updated successfully.")
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
    


@customer_bp.route("/requirement-pdf1/<string:requirement_id>", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def requirement_pdf(requirement_id):
    try:
        requirement = Requirements.objects(id=requirement_id).first()
        if not requirement:
            return jsonify({"message": "Requirement not found"}), 404

        data = requirement.to_mongo().to_dict()
        data["_id"] = str(data["_id"])

        for field in ["deadline", "created_at", "preferred_start_date"]:
            if field in data and isinstance(data[field], datetime):
                data[field] = data[field].strftime('%Y-%m-%d')

        html = render_template("requirements_template.html", data=data)
        
        pdf = HTML(string=html).write_pdf()
        
        gc.collect()

        response = make_response(pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'attachment; filename=requirement_report.pdf'
        return response

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"message": f"Error: {str(e)}"}), 500



    
@customer_bp.route("/requirement-pdf/<string:requirement_id>", methods=["GET"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def requirement_pdf_kit(requirement_id):
    try:
        requirement = Requirements.objects(id=requirement_id).first()
        if not requirement:
            return jsonify({"message": "Requirement not found"}), 404

        data = requirement.to_mongo().to_dict()
        data["_id"] = str(data["_id"])
        for field in ["deadline", "created_at", "preferred_start_date"]:
            if field in data and isinstance(data[field], datetime):
                data[field] = data[field].strftime('%Y-%m-%d')
        
        if field in data and 'locales' in data:
             languages = data.get('locales', '').split(',')
             print(languages)
             language_count = len(languages)  
             data["locale_count"] = language_count
              
        
        if "deadline" in data and "preferred_start_date" in data:
            deadline = data["deadline"]
            preferred_start_date = data["preferred_start_date"]
            
            print(type(deadline), deadline)
            print(type(preferred_start_date), preferred_start_date)
    
            date_diff = calculate_date(deadline, preferred_start_date)
            data["date_diff"] = date_diff 
            
        current_date = datetime.now().strftime('%d-%m-%Y')
        
        html = render_template("requirements_template.html", data=data, current_date = current_date)
        
        
        pdf = pdfkit.from_string(html, False)  
    
        
        response = make_response(pdf)
        response.headers['Content-Type'] = 'application/pdf'
        response.headers['Content-Disposition'] = 'attachment; filename=requirement_report.pdf'
        return response

    except Exception as e:
        print(f"Error occurred: {str(e)}")  
        return jsonify({"message": f"Error: {str(e)}"}), 500
    


def calculate_date(date1_str, date2_str, date_format="%Y-%m-%d"):
    ignore_dates = [
        "2025-01-05",
        "2025-15-08",
        "2025-27-08", 
        "2025-01-10",
        "2025-02-10",
        "2025-22-10",
        "2025-25-12",
        "2025-26-12"
    ]

    date1 = datetime.strptime(date1_str, date_format)
    date2 = datetime.strptime(date2_str, date_format)

    start_date = min(date1, date2)
    end_date = max(date1, date2)

    total_days = 0
    current_date = start_date

    while current_date <= end_date:
        date_str = current_date.strftime("%Y-%d-%m")
        if current_date.weekday() < 5 and date_str not in ignore_dates:
            total_days += 1
        current_date += timedelta(days=1)

    total_days -= 1 
    print(total_days)

    return total_days



@customer_bp.route("/send-quotation/<string:requirement_id>", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def send_quotation(requirement_id):
    try:
        # Fetch the requirement by ID
        requirement = Requirements.objects(id=requirement_id).first()
        if not requirement:
            return jsonify({'error': 'Requirement not found'}), 404

        # Prepare email data
        customer_name = requirement.customer_name or "Customer"
        customer_email = requirement.email
        quotation_id = str(requirement.id)
        rate = requirement.rate
        units = requirement.units
        
        if isinstance(requirement.deadline, datetime):
            deadline = requirement.deadline.strftime('%Y-%m-%d')
        else:
            deadline = requirement.deadline

        if isinstance(requirement.preferred_start_date, datetime):
            preferred_start_date = requirement.preferred_start_date.strftime('%Y-%m-%d')
        else:
            preferred_start_date = requirement.preferred_start_date
            
        print(requirement.deadline)
        print(requirement.units)
        total_estimate = f"{rate * units}{requirement.currency_choice}" if rate and units else "Not provided"
        date_diff = calculate_date(deadline, preferred_start_date)
        print(date_diff)

        # Prepare the email content
        msg = Message(
            subject="Your Quotation from ActiveLoc",
            recipients=[customer_email],
            body=f"""Dear {customer_name},

Thank you for considering ActiveLoc for your project. 
Please find attached the quotation document detailing costs, timelines, and terms.

Quotation Reference: {quotation_id} 
Total Estimate: {total_estimate} 
Expected Timeline: {date_diff} days

Kindly review and approve the quotation to proceed. If you have any questions or require adjustments, please let us know.

Regards, 
TMS ACTIVELOC
"""
        )

        mail.send(msg)

        return jsonify({"message": "Quotation sent successfully!"}), 200

    except Exception as e:
        print(f"Error in sending quotation: {str(e)}")
        return jsonify({"error": "An error occurred while sending the quotation."}), 500
    


@customer_bp.route("/notify-approval/<string:requirement_id>", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def notify_quotation_approval(requirement_id):
    try:
        requirement = Requirements.objects(id=requirement_id).first()
        if not requirement:
            return jsonify({'error': 'Requirement not found'}), 404

        customer_name = requirement.customer_name or "Customer"
        quotation_id = str(requirement.id)
        requirement.approved = "approved"
        requirement.save()

        sales_team_email = "joshua.pinto@activeloc.com"  

        
        msg = Message(
            subject=f"Update on Your Quotation - {quotation_id} - Approved",
            recipients=[sales_team_email],
            body=f"""Dear Sales Team,

The customer {customer_name} has approved the quotation {quotation_id}.

You may proceed with the next steps for project initiation.

Regards,
System Notification
"""
        )

        mail.send(msg)

        return jsonify({"message": "Approval notification sent to Sales team."}), 200

    except Exception as e:
        print(f"Error in sending approval notification: {str(e)}")
        return jsonify({"error": "An error occurred while sending the notification."}), 500



@customer_bp.route("/notify-rejection/<string:requirement_id>", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def notify_quotation_rejection(requirement_id):
    try:
        requirement = Requirements.objects(id=requirement_id).first()
        if not requirement:
            return jsonify({'error': 'Requirement not found'}), 404

        customer_name = requirement.customer_name or "Customer"
        quotation_id = str(requirement.id)
        data = request.get_json()
        
       
        requirement.rejection_reason = data.get("reason")
        requirement.rejection_changes = data.get("suggestedChanges")
        requirement.approved = "rejected"
        requirement.status = "Draft"
        requirement.save() 
        sales_team_email = "joshua.pinto@activeloc.com"  

        msg = Message(
            subject=f"Update on Your Quotation - {quotation_id} - Rejected",
            recipients=[sales_team_email],
            body=f"""Dear Sales Team,

The customer {customer_name} has rejected the quotation {quotation_id}.

Please review the feedback or get in touch with the customer for clarification or adjustments.

Regards,
System Notification
"""
        )

        mail.send(msg)

        return jsonify({"message": "Rejection notification sent to Sales team."}), 200

    except Exception as e:
        print(f"Error in sending rejection notification: {str(e)}")
        return jsonify({"error": "An error occurred while sending the notification."}), 500



@customer_bp.route("/notify-terminate/<string:requirement_id>", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def notify_quotation_termination(requirement_id):
    try:
        requirement = Requirements.objects(id=requirement_id).first()
        if not requirement:
            return jsonify({'error': 'Requirement not found'}), 404

        customer_name = requirement.customer_name or "Customer"
        quotation_id = str(requirement.id)

        requirement.approved = "terminated"
        requirement.save()

        sales_team_email = "joshua.pinto@activeloc.com"  

        msg = Message(
            subject=f"Quotation {quotation_id} Termination Notice",
            recipients=[sales_team_email],
            body=f"""Dear Sales Team,

The customer {customer_name} has terminated the quotation {quotation_id}.

Please follow up accordingly.

Regards,           
System Notification
"""
        )

        mail.send(msg)

        return jsonify({"message": "Termination notification sent to Sales team."}), 200

    except Exception as e:
        print(f"Error in sending termination notification: {str(e)}")
        return jsonify({"error": "An error occurred while sending the termination notification."}), 500
    
    
#PROJECT VENDOR ROUTES 
@customer_bp.route("/requirements/vendor/update", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def update_vendor_details():
    data = request.json
    requirement_id = data.get("requirement_id")
    vendor_data = data.get("vendor")
    user_id = get_jwt_identity() 

    if not requirement_id or not vendor_data:
        return jsonify({'error': 'requirement_id and vendor data are required'}), 400

    requirement = Requirements.objects(id=requirement_id).first()
    if not requirement:
        return jsonify({'error': 'Requirement not found'}), 404

    email = vendor_data.get('email')
    if not email:
        return jsonify({'error': 'Vendor email is required'}), 400

    for vendor in requirement.vendors:
        if vendor.email == email:
            if 'units' in vendor_data:
                vendor.units = vendor_data['units']
            if 'rate' in vendor_data:
                vendor.current_rate = vendor_data['rate']
            requirement.save()
            return jsonify({'message': f"Vendor {email} updated successfully."}), 200

    return jsonify({'error': f"Vendor with email {email} not found."}), 404



@customer_bp.route("/requirements/<string:requirement_id>/vendor", methods=["POST"])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def add_vendor(requirement_id):
    user_id = get_jwt_identity()  
    user = User.objects(id=user_id).first()
    email = user.email
    data = request.json

    # Fetch the requirement
    requirement = Requirements.objects(id=requirement_id).first()
    if not requirement:
        return jsonify({'error': 'Requirement not found'}), 404

    # Validate required fields
    vendor_email = data.get('email')
    if not vendor_email:
        return jsonify({'error': 'Vendor email is required'}), 400

    # Check for duplicate vendor
    if any(existing_vendor.email == vendor_email for existing_vendor in requirement.vendors):
        return jsonify({'error': f"Vendor with email {vendor_email} already exists."}), 400

    # Extract user and add to requirement.users (if not already present)
    vendor_user_id = data.pop('user', None)
    if vendor_user_id:
        if vendor_user_id not in requirement.users:
            requirement.users.append(vendor_user_id)

    # Add the new vendor
    try:
        new_vendor = Vendor(**data)
        requirement.vendors.append(new_vendor)
        requirement.save()
        return jsonify({'message': f"Vendor with email {vendor_email} added successfully."}), 201
    except Exception as e:
        return jsonify({'error': f'Failed to add vendor: {str(e)}'}), 400

