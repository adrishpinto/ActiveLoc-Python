from mongoengine import (
    Document, StringField, DateTimeField, URLField, BooleanField
)
from datetime import datetime, timezone

class Requirements(Document):
    title = StringField(required=True)
    description = StringField()
    deadline = DateTimeField(required=True)
    blob_url = StringField(required=True)

    created_at = DateTimeField(default=lambda: datetime.now(timezone.utc))
    approved = BooleanField(default=False)

    meta = {"collection": "requirements"}
