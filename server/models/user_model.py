from mongoengine import Document, StringField, BooleanField, IntField, EnumField
import enum


class GroupEnum(enum.Enum):
    ADMIN = "Admin"
    SALES = "Sales"
    OPERATIONS = "Operations"
    CUSTOMER = "Customer"
    VENDOR = "Vendor"
    CUSTOM = "Custom"

class CustomerTypeEnum(enum.Enum):
    BUSINESS = "Business"
    INDIVIDUAL = "Individual"

class User(Document):
    email = StringField(required=True, unique=True)
    password = StringField(required=True)
    first_name = StringField(required=True, max_length=20)
    last_name = StringField()

    group = EnumField(GroupEnum, required=True)  

    customer_id = IntField(min_value=100000, max_value=999999) 
    customer_code = StringField(uppercase=True, min_length=4, max_length=4)

    access_level = StringField()
    customer_type = EnumField(CustomerTypeEnum) 
    company_name = StringField()
    form_filled = BooleanField(default=True)

    meta = {"collection": "user"} 
