from mongoengine import (
    Document, StringField, ReferenceField,
    ListField, EnumField, URLField
)
import enum
from user_model import User 


class PermissionEnum(enum.Enum):
    VIEW = "view"
    EDIT = "edit"


class Project(Document):
    title = StringField(required=True)
    content = StringField(default="")

    owner = ReferenceField(User, required=True)
    
    shared_user_ids = ListField(ReferenceField(User))  
    shared_user_permissions = ListField(EnumField(PermissionEnum)) 

    source_blob_url = URLField()

    meta = {"collection": "project"}
