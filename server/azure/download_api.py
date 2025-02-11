from flask import Blueprint, jsonify, send_file
from flask_cors import CORS  # Import CORS
from azure.storage.blob import BlobServiceClient
import io
import os
import mimetypes
from extensions import cache
from dotenv import load_dotenv

load_dotenv()

CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")
blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)

download = Blueprint('download', __name__)
CORS(download, expose_headers=["X-File-Type"])  # Allow custom headers

@download.route('/download', methods=['GET'])
def download_blob():
    from app import auth
    try:
        blob_name = cache.get("file_name")
        extension = cache.get("extension")

        if not blob_name:
            return jsonify({"error": "Please upload, or reupload the file"}), 400

        blob_client = blob_service_client.get_blob_client(container="target", blob=blob_name)
        blob_data = blob_client.download_blob()

        if not blob_data:
            return jsonify({"error": "No blob data found"}), 404

        file_stream = io.BytesIO(blob_data.readall())

        mime_type, _ = mimetypes.guess_type(blob_name)
        if mime_type is None:
            mime_type = "application/octet-stream" 

        response = send_file(file_stream, as_attachment=True, download_name=blob_name, mimetype=mime_type)

        # Add custom headers
        response.headers["X-File-Type"] = extension or "Unknown"
        response.headers["X-Blob-Name"] = blob_name
        response.headers["Content-Length"] = str(file_stream.getbuffer().nbytes)

        return response

    except Exception as ex:
        return jsonify({"error": f"Exception occurred: {str(ex)}"}), 500
