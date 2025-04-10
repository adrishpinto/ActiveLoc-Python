from azure.storage.blob import BlobServiceClient
import os
from dotenv import load_dotenv

load_dotenv()

def blob_download(blob_name , CONTAINER_NAME):
    CONNECTION_STRING = os.getenv("CONTAINER_CONNECTION_STRING")
    if not CONNECTION_STRING:
        raise ValueError("Missing connection string in environment variables.")

    blob_service_client = BlobServiceClient.from_connection_string(CONNECTION_STRING)
    blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=blob_name)

    try:
        print(f"Downloading blob '{blob_name}' into the './downloads' folder...")
        blob_data = blob_client.download_blob().readall()

        
        destination_folder = "./all_files/workbench_files"
        os.makedirs(destination_folder, exist_ok=True)

        
        destination_path = os.path.join(destination_folder, blob_name)

       
        with open(destination_path, "wb") as file:
            file.write(blob_data)

        print(f"Download completed! File saved at: {destination_path}")
        return destination_path
    except Exception as ex:
        print(f"Exception occurred: {ex}")
        return None

# Example usage:
if __name__ == "__main__":
    blob_download("81113582-76f9-44f5-a3ae-01b87b817c50.docx.xlf")
