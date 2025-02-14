from azure.core.credentials import AzureKeyCredential
from azure.ai.translation.document import DocumentTranslationClient
from dotenv import load_dotenv
import os

load_dotenv()

def translate_xliff(file_name, lang): 
    if not file_name:
        return {"error": "File name is required."}, 400

    endpoint = os.getenv("ENDPOINT")
    credential = os.getenv("CREDENTIAL")
    source_url = os.getenv("SOURCE_XLIFF_URL")
    target_url = os.getenv("TARGET_XLIFF_URL")

    if not all([endpoint, credential, source_url, target_url]):
        return {"error": "Missing required environment variables."}, 400

    document_translation_client = DocumentTranslationClient(endpoint, AzureKeyCredential(credential))

    try:
        poller = document_translation_client.begin_translation(source_url, target_url, lang, prefix=file_name)
        result = poller.result()
        print(f"Translation result: {result}")
        
    except Exception as e:
        print(f"Error during translation: {str(e)}")
        return {"error": str(e)}, 500

    status = poller.status()
    return {"status": "success", "message": "Translation completed successfully."} if status == "Succeeded" else {"status": "failed", "message": f"Translation failed with status: {status}"}
