from azure.storage.blob import BlobServiceClient
import os
import argparse
from dotenv import load_dotenv

load_dotenv()

def download_blob(blob_name, local_file_name):
    CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")
    blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)

    CONTAINER_NAME = "target"
    local_path = os.getcwd()
    download_file_path = os.path.join(local_path, local_file_name)

    blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=blob_name)

    try:
        print(f"Downloading blob {blob_name} to {download_file_path}")
        
        with open(download_file_path, "wb") as download_file:
            download_file.write(blob_client.download_blob().readall())

        print("Download completed successfully!")
    except Exception as ex:
        print(f"Exception occurred: {ex}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download a blob from Azure Storage")
    parser.add_argument("blob_name", help="Name of the blob to download")
    parser.add_argument("local_file_name", help="Local file name to save the downloaded blob")
    args = parser.parse_args()
    
    download_blob(args.blob_name, args.local_file_name)
