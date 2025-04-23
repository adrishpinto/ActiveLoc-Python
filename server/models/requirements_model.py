from mongoengine import (
    Document, StringField, DateTimeField, URLField, BooleanField, FloatField
)
from datetime import datetime, timezone

class Requirements(Document):
    created_at = DateTimeField(default=lambda: datetime.now(timezone.utc))
    
    # Client given
    title = StringField(required=True)
    description = StringField(required=True)
    customer_name = StringField(required=True)
    contact_person = StringField(required=True)
    email = StringField(required=True)
    phone_number = StringField(required=True)
    city = StringField(required=True)
    country = StringField(required=True)
    
    # Client given optional
    budget = FloatField(default=0.0) 
    file_link = StringField(default="")
    urgent = StringField(required=False, choices=[
        "normal", "urgent", "express"
    ], default="normal")
    one_time = BooleanField(default=False) 
    quality = StringField(default="")
    
    # Client + Internal 
    service_type = StringField(required=True, choices=[
        "Translation", "Localization", "Consulting", "Staffing", "Data Services", "Other"
    ])
    preferred_start_date = DateTimeField(required=False) #optional
    deadline = DateTimeField(required=False) #optional
     
    # Internal data 
    # A. Contact details
    billing_address = StringField(default="")
    tax_id = StringField(default="")
    
    # B. Service Requirement Details 
    task_description = StringField(default="")
    
    # C. Volume and Complexity
    units = StringField(default="")
    locales = StringField(default="")
    resouces = StringField(default="")
    tools = StringField(default="")
    existing_material = StringField(default="")
    
    # D. Quatation and Pricing
    currency_choice = StringField(default="")
    billing_model = StringField(default="")
    cost_breakdown = StringField(default="") #optional
    discounts = StringField(default="") 
    tax = StringField(default="")
    payment_terms = StringField(default="")
    
    # E. Timeline Estimation
    estimation = StringField(default="")
    milestones = StringField(default="") #optional
    buffer_days = StringField(default="") #optional
    
    # F. Internal Notes
    quote_by = StringField(default="")
    status = StringField(required=True, choices=[
        "Draft", "Reviewed", "Sent", "Approved"
    ], default="Draft")
    
    approved = BooleanField(default=False)
    meta = {"collection": "requirements"}
