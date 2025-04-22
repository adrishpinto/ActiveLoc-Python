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
    phone_number = StringField(required=False)
    city = StringField(required=False)
    country = StringField(required=False)
    organization_name = StringField(required=False)