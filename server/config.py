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
        "https://active-loc-python.vercel.app"
    ]
    CORS_ALLOW_HEADERS = ["Content-Type", "Authorization", "X-CSRF-TOKEN", "file_name"]
    CORS_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    MONGO_URI = os.getenv("MONGO_URI")


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


config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}

FLASK_ENV = os.getenv("FLASK_ENV", "development")
CurrentConfig = config_by_name[FLASK_ENV]
