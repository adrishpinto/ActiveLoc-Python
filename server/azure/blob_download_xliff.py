from azure.storage.blob import BlobServiceClient
import os
from dotenv import load_dotenv

load_dotenv()

def blob_download_xliff(blob_name):
    CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")
    if not CONNECTION_STRING:
        raise ValueError("Missing connection string in environment variables.")

    blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)
    CONTAINER_NAME = "target-xliff"
    blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=blob_name)

    try:
        print(f"Downloading blob '{blob_name}' into the './downloads_xliff_post' folder.")
        blob_data = blob_client.download_blob().readall()

        
        destination_folder = "./all_files/downloads"
        os.makedirs(destination_folder, exist_ok=True)

        
        destination_path = os.path.join("./all_files/downloads", blob_name)

       
        with open(destination_path, "wb") as file:
            file.write(blob_data)

        print(f"Download completed! File saved at: {destination_path}")
        return destination_path
    except Exception as ex:
        print(f"Exception occurred: {ex}")
        return None

# Example usage:
if __name__ == "__main__":
    blob_download_xliff("2b1a28a5-7c27-439d-8a6f-99d173ed77f9.xlf")
