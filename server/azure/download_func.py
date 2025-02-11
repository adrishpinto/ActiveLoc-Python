from azure.storage.blob import BlobServiceClient
import os 
from dotenv import load_dotenv

load_dotenv()

CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")

blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)
                    
CONTAINER_NAME = "target"
BLOB_NAME = "acbd093f-a23b-4baf-9667-2055882893ca.txt"
local_file_name = "hello.txt"


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
