import os
from flask import Blueprint, request, jsonify
import requests
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator.decorator import group_required
from extensions import cache
import logging
from decorator.decorator import group_required
from azure.core.credentials import AzureKeyCredential
from azure.ai.translation.document import DocumentTranslationClient
from azure.storage.blob import BlobServiceClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

translate = Blueprint('translate', __name__)

@translate.route('/translate_v2', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def translate_text():
    try:
        user_id = get_jwt_identity()
        file_name = cache.get(f"file_name_{user_id}")
        if not file_name:
            return jsonify({"error": "No file found in cache for the user"}), 404

        data = request.get_json()
        language = data.get("lang", "fr")
        glossary_url = data.get("glossary", "default.csv")
        if glossary_url == "":
            glossary_url = "default.csv"
        glossary_url = f"https://translatefiles.blob.core.windows.net/glossary/{glossary_url}"

        print(glossary_url)

        if not language:
            return jsonify({"error": "Missing 'language' in request body"}), 400

        source_url = os.getenv("SOURCE_URL")
        target_url = os.getenv("TARGET_URL")
        endpoint = os.getenv("ENDPOINT2")
        key = os.getenv("CREDENTIAL")

        if not all([source_url, target_url, glossary_url, endpoint]):
            return jsonify({"error": "One or more required environment variables are missing"}), 500

        headers = {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": key
        }

        payload = {
            "inputs": [
                {
                    "source": {"sourceUrl": source_url, "filter": {"prefix": file_name}},
                    "targets": [
                        {"targetUrl": target_url, "language": language, "glossaries": [{"glossaryUrl": glossary_url, "format": "csv"}]}
                    ]
                }
            ]
        }

        response = requests.post(endpoint, headers=headers, json=payload)

        if response.status_code != 200:
            error_info = response.json()
            logger.error(f"API Error: {error_info}")
            if error_info.get("status") == "NotStarted":
                return jsonify({
                    "message": "Translation request accepted, but has not yet started. Please check again shortly.",
                    "request_id": error_info.get("id")
                }), 202
            return jsonify({"error": f"API Error: {error_info}"}), response.status_code

        logger.info(f"Translation started successfully: {response.status_code}")
        return jsonify(response.json()), response.status_code

    except Exception as e:
        logger.error(f"Unexpected Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


    
    
@translate.route('/translate', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def translate_file():
    user_id = get_jwt_identity()  
    file_name = cache.get(f"file_name_{user_id}")
    
    if not file_name:
        return jsonify({"error": "Please upload a file first"}), 404

    language = request.json.get("lang", "fr")

    source_url = os.getenv("SOURCE_URL")
    target_url = os.getenv("TARGET_URL")
    endpoint = os.getenv("ENDPOINT1") 
    
    cred = os.getenv("CREDENTIAL")
    
    
    credential = AzureKeyCredential(cred)

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

@translate.route('/list-blobs', methods=['GET'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def list_all_blobs():
    try:
        connection_string = os.getenv("CONTAINER_CONNECTION_STRING")
        container_name = "glossary"

        if not connection_string or not container_name:
            return jsonify({"error": "Missing Azure storage config"}), 500

        blob_service_client = BlobServiceClient.from_connection_string(connection_string)
        container_client = blob_service_client.get_container_client(container_name)

        blob_list = [blob.name for blob in container_client.list_blobs()]

        return jsonify({"blobs": blob_list})

    except Exception as e:
        logger.error(f"Failed to list blobs: {str(e)}")
        return jsonify({"error": str(e)}), 500
