import identity.web
import requests
from flask import Flask, redirect, render_template, request, session, url_for
from flask_session import Session
from routes.upload_routes import upload
from flask_cors import CORS
from routes.upload_routes import upload
from azure.translate_api import translate
from azure.download_api import download
from extensions import cache
from routes.test_routes import test_bp
import os 
from dotenv import load_dotenv

load_dotenv()


__version__ = "1.0"

import app_config


app = Flask(__name__)
app.config.from_object(app_config)


CORS(app)


app.config['CACHE_TYPE'] = 'RedisCache'
app.config['CACHE_REDIS_HOST'] = 'localhost'
app.config['CACHE_REDIS_PORT'] = 6379
app.config['CACHE_REDIS_DB'] = 0
app.config['CACHE_REDIS_URL'] = 'redis://localhost:6379/0'

cache.init_app(app) 

app.register_blueprint(upload)  
app.register_blueprint(translate) 
app.register_blueprint(download)
app.register_blueprint(test_bp)

assert app.config["REDIRECT_PATH"] != "/", "REDIRECT_PATH must not be /"

Session(app)

from werkzeug.middleware.proxy_fix import ProxyFix
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

app.jinja_env.globals.update(Auth=identity.web.Auth)
auth = identity.web.Auth(
    session=session,
    authority=app.config["AUTHORITY"],
    client_id=app.config["CLIENT_ID"],
    client_credential=app.config["CLIENT_SECRET"],
)

@app.route("/login")
def login():
    return render_template("login.html", version=__version__, **auth.log_in(
        scopes=app_config.SCOPE,
        redirect_uri=url_for("auth_response", _external=True), 
        prompt="select_account",  
        ))
    
@app.route(app_config.REDIRECT_PATH)
def auth_response():
    result = auth.complete_log_in(request.args)
    if "error" in result:
        return render_template("auth_error.html", result=result)
    return redirect(url_for("index"))

@app.route("/logout")
def logout():
    return redirect(auth.log_out(url_for("index", _external=True)))

@app.route("/")
def index():
    if not (app.config["CLIENT_ID"] and app.config["CLIENT_SECRET"]):
        
        return render_template('config_error.html')
    if not auth.get_user():
        return redirect(url_for("login"))
    return render_template('index.html', user=auth.get_user(), version=__version__)


@app.route("/call_downstream_api")
def call_downstream_api():
   
    token = auth.get_token_for_user(app_config.SCOPE)
    if "error" in token:
        return redirect(url_for("login"))
    
    api_result = requests.get(
        app_config.ENDPOINT,
        headers={'Authorization': 'Bearer ' + token['access_token']},
        timeout=30,
    ).json()
    return render_template('display.html', result=api_result)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 4000))  
    app.run(host="0.0.0.0", port=port, debug=True)
    
    # flask run --host=localhost --port=5000