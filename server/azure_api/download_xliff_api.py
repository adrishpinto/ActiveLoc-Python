from flask import Blueprint, jsonify, send_file,  redirect, url_for
from azure.storage.blob import BlobServiceClient
from flask_jwt_extended import jwt_required, get_jwt_identity
import io
import os
import mimetypes
from extensions import cache
from dotenv import load_dotenv


load_dotenv()

CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")
blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)

download_xliff = Blueprint('download_xliff', __name__)


@download_xliff.route('/download_xliff', methods=['GET'])
@jwt_required()
def download_blob():
    user_id = get_jwt_identity()
    try:
        blob_name = cache.get(f"file_name_{user_id}") + ".xlf"
       

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
        response.headers["file_name"] = blob_name
        
        #allowed headers. 
        response.headers["Access-Control-Expose-Headers"] = "file_type, file_name"


        return response

    except Exception as ex:
        return jsonify({"error": f"Exception occurred: {str(ex)}"}), 500
