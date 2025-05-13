from mongoengine import Document, StringField, BooleanField, IntField, EnumField, DictField
import enum


class GroupEnum(enum.Enum):
    ADMIN = "Admin"
    SALES = "Sales"
    OPERATIONS = "Operations"
    CUSTOMER = "Customer"
    VENDOR = "Vendor"


class User(Document):
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    first_name = StringField(required=True, max_length=20)
    last_name = StringField(required=True)

    group = EnumField(GroupEnum, required=True)
    status = BooleanField(required=True)
    permission = StringField(required=True)
    usage = DictField(field=IntField(min_value=0), default=dict)

    # Optional fields
    phone_number = StringField()
    city = StringField()
    country = StringField()
    
   # customer + vendor 
    type = StringField(choices=["Business", "Individual"])
    organization_name = StringField()
    billing_address = StringField()
    tax_id = StringField()
    pan_number = StringField()
    billing_currency = StringField()
    
    
    #vendor only 
    standard_rate = StringField()
    services_offered = StringField() 
    custom_service = StringField()
    
    #customer only  
    created_by = StringField()
