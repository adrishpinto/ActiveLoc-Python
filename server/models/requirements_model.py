from mongoengine import (
    Document, StringField, DateTimeField, URLField, BooleanField, FloatField, IntField, ReferenceField, EmbeddedDocument, ListField, EmbeddedDocumentField
)
from datetime import datetime, timezone, timedelta
from models.user_model import User


class Vendor(EmbeddedDocument):
    name = StringField(default="")
    company = StringField(default="")
    email = StringField(default="")
    work_status = StringField(default="", choices = ["not_started","ongoing", "completed", ""])
    bill_status = StringField(default="", choices=["pending", "submitted", "paid", ""])
    standard_rate = StringField(default="")
    current_rate = FloatField(default=0.0)
    units = FloatField(default=0.0)
    total = FloatField(defailt=0.0)
    billing_currency = StringField(default="")
    

class Requirements(Document):
    created_at = DateTimeField(default=lambda: datetime.now(timezone.utc))
    users = ListField(StringField(), required=True)
    quotation_deadline = DateTimeField(default=None)
    countdown = IntField(default = "")
    
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
    
    quality = StringField(default="")
    
    # Client + Internal 
    service_type = StringField(required=True, choices=[
        "Translation", "Localization", "Consulting", "Staffing", "Data Services", "Other"
    ])
    preferred_start_date = DateTimeField(required=False) #optional
    deadline = DateTimeField(required=False) #optional
    date_diff = IntField(default=0)
    # Internal data 
    # A. Contact details
    billing_address = StringField(default="")
    tax_id = StringField(default="")
    
    # B. Service Requirement Details 
    task_description = StringField(default="")
    
    # C. Volume and Complexity
    units = FloatField(default=0.0)
    locales = StringField(default="")
    resouces = StringField(default="")
    tools = StringField(default="")
    existing_material = StringField(default="")
    
    # D. Quatation and Pricing
    currency_choice = StringField(default="")
    billing_model = StringField(default="")
    cost_breakdown = StringField(default="") 
    discounts = StringField(default="") 
    tax = StringField(default="")
    payment_terms = StringField(default="")
    
    # E. Timeline Estimation
    estimation = StringField(default="")
    milestones = StringField(default="") 
    buffer_days = StringField(default="")
    
    # F. Internal Notes
    quote_by = StringField(default="")
    status = StringField(required=True, choices=[
        "Draft", "Submitted"
    ], default="Draft")
    
    approved = StringField(default=False)
  
    #invoice data
    invoice_subject = StringField(default="")
    invoice_description = StringField(default="")
    rate = FloatField(default = 0.0)
    
    rejection_reason = StringField(default="")
    rejection_changes = StringField(default="")
    
    #project confirmed details 
    project_code = StringField(default = "")
    project_status = StringField(default="", choices=[
        "in-progress", "assigned", "delivered", ""
    ]) 
    
    vendors = ListField(EmbeddedDocumentField(Vendor), default=list)
    
    profit = FloatField(default = 0)
    pm_hours = FloatField(default = 0)
    pm_rate = FloatField(default = 0)
    pm_profit = FloatField(default= 0) 
    meta = {"collection": "requirements"}
    
#PM_HOURS, PM_RATE
    
    
