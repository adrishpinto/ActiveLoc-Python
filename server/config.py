import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    #base config... 
    
    CACHE_TYPE = "SimpleCache"
    CACHE_DEFAULT_TIMEOUT = 300
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_secret_key")
    JWT_TOKEN_LOCATION = ["cookies"]
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "https://active-loc-python.vercel.app",
        "https://tms.activeloc.com",
        "https://nice-field-0ad812800.6.azurestaticapps.net"
    ]
    CORS_ALLOW_HEADERS = ["Content-Type", "Authorization", "X-CSRF-TOKEN", "file_name"]
    CORS_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    MONGO_URI = os.getenv("MONGO_URI")
    
    JWT_COOKIE_CSRF_PROTECT = False
    
    MAIL_SERVER = os.getenv("MAIL_SERVER")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True") == "True"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")
    
    

#specific configs
class DevelopmentConfig(Config):
    """Development-specific settings."""
    DEBUG = True
    JWT_COOKIE_SECURE = False  
    JWT_COOKIE_HTTPONLY = False  
    JWT_COOKIE_SAMESITE = "Lax"


class ProductionConfig(Config):
    """Production-specific settings."""
    DEBUG = False
    JWT_COOKIE_SECURE = True  
    JWT_COOKIE_HTTPONLY = True  
    JWT_COOKIE_SAMESITE = "None"
    
class HTTPTestingConfig(Config):
    """Config for testing JWT cookies over HTTP."""
    DEBUG = True
    JWT_COOKIE_SECURE = False  # Allow cookies over HTTP
    JWT_COOKIE_HTTPONLY = True  # Keep cookies HTTP-only for security
    JWT_COOKIE_SAMESITE = "None"
    
class AWSCONFIG(Config):
    DEBUG = True
    JWT_COOKIE_SECURE = False  # Allow cookies over HTTP
    JWT_COOKIE_HTTPONLY = True  # Keep cookies HTTP-only for security
    JWT_COOKIE_SAMESITE = "Lax"
    


config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "http": HTTPTestingConfig,
    "aws": AWSCONFIG
}

FLASK_ENV = os.getenv("FLASK_ENV", "development")
CurrentConfig = config_by_name[FLASK_ENV]
