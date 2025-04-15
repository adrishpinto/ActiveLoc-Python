from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from mongoengine import connect
from extensions import cache
import os

from routes.upload_routes import upload
from azure_api.translate_api import translate
from azure_api.download_xliff_api import download_xliff
from azure_api.download_api import download

from routes.t2s_batch_routes import t2s_batch
from routes.user_routes import user_bp
from routes.s2t_routes import speech_bp
from routes.isolator_routes import isolator_bp
from routes.t2s_routes import t2s_bp
from routes.workbench_routes import workbench_bp
from routes.convert_routes_tikal import convert_tikal_bp
from routes.merge_routes_tikal import merge_tikal_bp
from routes.project_routes import project_bp
from config import CurrentConfig
from extensions import mail

app = Flask(__name__)

# config.py set up here
app.config.from_object(CurrentConfig)

CORS(app, supports_credentials=True, 
     origins=CurrentConfig.CORS_ALLOWED_ORIGINS,
     allow_headers=CurrentConfig.CORS_ALLOW_HEADERS,
     methods=CurrentConfig.CORS_METHODS)

cache.init_app(app)
mail.init_app(app)


connect(db="activeloc_users", host=CurrentConfig.MONGO_URI, alias="default")

# Register blueprints
app.register_blueprint(upload)  
app.register_blueprint(speech_bp)  
app.register_blueprint(t2s_batch)
app.register_blueprint(translate) 
app.register_blueprint(download)
app.register_blueprint(download_xliff)
app.register_blueprint(user_bp)
app.register_blueprint(isolator_bp)
app.register_blueprint(t2s_bp)
app.register_blueprint(convert_tikal_bp)
app.register_blueprint(merge_tikal_bp)
app.register_blueprint(workbench_bp)
app.register_blueprint(project_bp)

jwt = JWTManager(app) 

@app.route('/')
def home():
    return "Server is working"

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))  
    app.run(
        host="0.0.0.0", 
        port=port, 
        debug=CurrentConfig.DEBUG, 
        # ssl_context=('server.crt', 'private.key') 
    )
