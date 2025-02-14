from azure.storage.blob import BlobServiceClient
from dotenv import load_dotenv
import os

load_dotenv()

CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")
CONTAINER_NAME = "source"

def upload_blob(file_path, blob_name):
    try:
        blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)
        container_client = blob_service_client.get_container_client(CONTAINER_NAME)

        with open(file_path, "rb") as data:
            blob_client = container_client.get_blob_client(blob_name)
            blob_client.upload_blob(data, overwrite=True)

        print(f"File {file_path} uploaded to {blob_name} in {CONTAINER_NAME}.")
        return {"message": "Upload successful", "blob_name": blob_name}

    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)} 
