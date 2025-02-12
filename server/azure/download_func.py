from azure.storage.blob import BlobServiceClient
import os 
from dotenv import load_dotenv

load_dotenv()

CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")

blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)
                    
CONTAINER_NAME = "target"
BLOB_NAME = "8a9371c7-55ab-49a8-af78-bb953222dfbc.docx"
local_file_name = "hello.docx"


local_path = os.getcwd()
download_file_path = os.path.join(local_path, local_file_name)


blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=BLOB_NAME)

try:
    print(f"Downloading blob to {download_file_path}")
    
   
    with open(download_file_path, "wb") as download_file:
        download_file.write(blob_client.download_blob().readall())

    print("Download completed successfully!")
    
except Exception as ex:
    print(f"Exception occurred: {ex}")
