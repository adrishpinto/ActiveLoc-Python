from flask import Blueprint
from file_conversions.html.html_to_xliff import html_to_xliff
import os 
from custom_logger import logger
from azure.blob_download import blob_download
from azure.upload_blob_xliff import upload_blob_xliff
from azure.translate_xliff import translate_xliff
from azure.blob_download_xliff import blob_download_xliff
import threading
import time

convert_bp = Blueprint("convert_bp", __name__)

def delayed_blob_download_xliff(file_name):
    time.sleep(30)  #
    blob_download_xliff(file_name)

@convert_bp.route("/convert", methods=['GET'])
def download():
    from app import cache
    file_name = cache.get("file_name")
    converted_name = cache.get("base_name") + ".xlf"
    blob_download(file_name)
    ext = cache.get("extension")
    ext = ".html"
    os.makedirs("./all_files/converted", exist_ok=True)
    
    if ext == ".html": 
        html_src = f'./all_files/uploads/{file_name}'
        xliff_file = f'./all_files/converted/{converted_name}'
    else:
        logger.error("Unsupported extension: %s", ext)
        return "Unsupported file type!", 400

    cwd = os.getcwd()
    print(f"Current working directory: {cwd}")
    
    html_to_xliff(html_src, xliff_file) 
    upload_blob_xliff(f"./all_files/converted/{converted_name}",f"{converted_name}")
    translate_xliff(converted_name)
    time.sleep(2)
    blob_download_xliff(converted_name)
    
    return "Conversion started!", 200


 