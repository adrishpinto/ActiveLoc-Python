from flask import Blueprint, session, jsonify, redirect, url_for, request
from azure.core.credentials import AzureKeyCredential
from azure.ai.translation.document import DocumentTranslationClient
from dotenv import load_dotenv
from extensions import cache
import os
import logging
import app_config

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

translate = Blueprint('translate', __name__)

@translate.route('/translate', methods=['POST'])
def translate_file():
    # from app import auth
    # token = auth.get_token_for_user(app_config.SCOPE)
    # if "error" in token:
    #     return redirect(url_for("login"))

    file_name = cache.get("file_name")
    
    if not file_name:
        return jsonify({"error": "Please upload a file first"}), 404

    language = request.json.get("lang", "fr")
  # Default to "fr" if not provided

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
