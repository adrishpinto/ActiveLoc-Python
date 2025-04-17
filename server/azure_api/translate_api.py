import os
from flask import Blueprint, request, jsonify
import requests
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator.decorator import group_required
from extensions import cache

load_dotenv()

translate = Blueprint('translate', __name__)

@translate.route('/translate', methods=['POST'])
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

        if not language:
            return jsonify({"error": "Missing 'language' in request body"}), 400
        
        source_url   = os.getenv("SOURCE_URL")
        target_url   = os.getenv("TARGET_URL")
        glossary_url = "https://translatefiles.blob.core.windows.net/glossary/glossary.csv?sp=r&st=2025-04-16T11:47:49Z&se=2025-04-16T19:47:49Z&spr=https&sv=2024-11-04&sr=b&sig=SMhqyP8EkeQMN1hdJMWXbFsOKImI0hmjG6CrfmTExHI%3D"
        endpoint     = os.getenv("ENDPOINT")
        key = os.getenv("CREDENTIAL")

        if not all([source_url, target_url, glossary_url, endpoint]):
            return jsonify({"error": "One or more required environment variables are missing"}), 500

        constructed_url = endpoint
        headers = {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": key  # Auth header
        }


        payload = {
            "inputs": [
                {
                    "source": {
                        "sourceUrl": source_url,
                        "filter": {
                            "prefix": file_name
                        }
                    },
                    "targets": [
                        {
                            "targetUrl": target_url,
                            "language": language,
                            "glossaries": [
                                {
                                    "glossaryUrl": glossary_url,
                                    "format": "csv"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

        response = requests.post(constructed_url, headers=headers, json=payload)

        print(f'response status code: {response.status_code}\n'
              f'response status: {response.reason}\n'
              f'response headers: {response.headers}')

        return jsonify(response.json()), response.status_code

    except Exception as e:
        return jsonify({"error": str(e)}), 500
