import os
AUTHORITY= os.getenv("AUTHORITY")

# Application (client) ID of app registration
CLIENT_ID = os.getenv("CLIENT_ID")
# Application's generated client secret: never check this into source control!
CLIENT_SECRET = os.getenv("CLIENT_SECRET")
 
REDIRECT_PATH = "/getAToken"  # Used for forming an absolute URL to your redirect URI.

ENDPOINT = 'https://graph.microsoft.com/v1.0/me'  
SCOPE = ["User.Read"]


SESSION_TYPE = "filesystem"


ALLOWED_USERS = [
    "john.doe@yourcompany.com",
    "jane.smith@yourcompany.com",
    "employee@yourcompany.com",
    "joshua.pinto@activeloc.com"
]

