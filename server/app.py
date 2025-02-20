from flask import Flask
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_session import Session
from flask_cors import CORS
from dotenv import load_dotenv
from flask_caching import Cache
from mongoengine import connect
import os
import datetime


from routes.upload_routes import upload
from azure_api.translate_api import translate
from azure_api.download_xliff_api import download_xliff
from azure_api.download_api import download
from routes.user_routes import user_bp
from extensions import cache
from routes.convert_routes import convert_bp

# Load environment variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")  # Example: "mongodb://localhost:27017/test"

# Initialize Flask App
app = Flask(__name__)

CORS(app, supports_credentials=True, origins=[
    "http://localhost:5173",
    "https://active-loc-python.vercel.app"
], allow_headers=["Content-Type", "Authorization"], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

app.config['CACHE_TYPE'] = 'SimpleCache'
app.config['CACHE_DEFAULT_TIMEOUT'] = 300
  
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_COOKIE_SECURE"] = True  
app.config["SESSION_COOKIE_SAMESITE"] = "None"  
app.config["SESSION_COOKIE_HTTPONLY"] = True 



cache.init_app(app)

# ✅ Connect MongoEngine to MongoDB
connect(db="activeloc_users",host=MONGO_URI, alias="default")

# Register blueprints
app.register_blueprint(upload)  
app.register_blueprint(translate) 
app.register_blueprint(download)
app.register_blueprint(download_xliff)
app.register_blueprint(convert_bp)
app.register_blueprint(user_bp)

app.config["JWT_SECRET_KEY"] = "your_secret_key"  # Change this!
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]  
app.config["JWT_COOKIE_SECURE"] = False  # Set to False for local testing
app.config["JWT_COOKIE_HTTPONLY"] = True  
app.config["JWT_COOKIE_SAMESITE"] = "Lax" 

jwt = JWTManager(app) 

Session(app)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))  
    app.run(host="0.0.0.0", port=port, debug=True)
