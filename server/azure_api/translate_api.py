from flask import Blueprint, session, jsonify, redirect, url_for, request
from azure.core.credentials import AzureKeyCredential
from azure.ai.translation.document import DocumentTranslationClient
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from models.user_model import User
from extensions import cache
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

translate = Blueprint('translate', __name__)

@translate.route('/translate', methods=['POST'])
@jwt_required()
def translate_file():
    user_id = get_jwt_identity()  
    file_name = cache.get(f"file_name_{user_id}")
    
    if not file_name:
        return jsonify({"error": "Please upload a file first"}), 404

    language = request.json.get("lang", "fr")


    endpoint = os.getenv("ENDPOINT") 
    cred = os.getenv("CREDENTIAL")
    credential = AzureKeyCredential(cred)

    source_url = os.getenv("SOURCE_URL")
    target_url = os.getenv("TARGET_URL")

    if not source_url or not target_url:
        return jsonify({"error": "Source or Target URL is not set in environment variables."}), 400

    document_translation_client = DocumentTranslationClient(endpoint, credential)

    try:
        poller = document_translation_client.begin_translation(source_url, target_url, language, prefix=file_name)
        result = poller.result()
        logger.info(f"Translation result: {result}")
        logger.info(language)
    except Exception as e:
        logger.error(f"Error during translation: {str(e)}")
        return jsonify({"error": str(e)}), 500

    if poller.status() == "Succeeded":
        return jsonify({
            "status": "success",
            "message": "Translation completed successfully."
        })
    else:
        return jsonify({
            "status": "failed",
            "message": f"Translation failed with status: {poller.status()}"
        })
