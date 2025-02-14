from flask import Blueprint, jsonify, send_file,  redirect, url_for
from azure.storage.blob import BlobServiceClient
import io
import os
import mimetypes
from extensions import cache
from dotenv import load_dotenv
import app_config


load_dotenv()

CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")
blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)

download_xliff = Blueprint('download_xliff', __name__)


@download_xliff.route('/download_xliff', methods=['GET'])
def download_blob():
    # from app import auth
    # token = auth.get_token_for_user(app_config.SCOPE)
    # if "error" in token:
    #     return redirect(url_for("login"))
    
    try:
        blob_name = cache.get("base_name") + ".xlf"
       

        if not blob_name:
            return jsonify({"error": "Please upload, or reupload the file"}), 400

        blob_client = blob_service_client.get_blob_client(container="target-xliff", blob=blob_name)
        blob_data = blob_client.download_blob()

        if not blob_data:
            return jsonify({"error": "No blob data found"}), 404

        file_stream = io.BytesIO(blob_data.readall())

        mime_type, _ = mimetypes.guess_type(blob_name)
        if mime_type is None:
            mime_type = "application/octet-stream" 

        response = send_file(file_stream, as_attachment=True, download_name=blob_name, mimetype=mime_type)

        
   

        return response

    except Exception as ex:
        return jsonify({"error": f"Exception occurred: {str(ex)}"}), 500
