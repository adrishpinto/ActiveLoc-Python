from flask import Blueprint,request
from file_conversions.html.html_to_xliff import html_to_xliff
from file_conversions.iOS_Strings.strings_to_xliff import string_to_xliff
from file_conversions.docx.odf_to_xliff import odf_to_xliff
from file_conversions.new_android.android_to_xliff import android_to_xliff
import os 
from custom_logger import logger
from azure.blob_download import blob_download
from azure.upload_blob_xliff import upload_blob_xliff
from azure.translate_xliff import translate_xliff
from azure.blob_download_xliff import blob_download_xliff
import threading
import time

# this is only html mtpe and works with the current set up. 

convert_bp = Blueprint("convert_bp", __name__)

@convert_bp.route("/convert", methods=['GET'])
def download():
    from app import cache
    file_name = cache.get("file_name")
    converted_name = cache.get("base_name") + ".xlf"
    language = request.args.get("language", "en")  # Default to English if not provided
    
    blob_download(file_name)
    ext = cache.get("extension")
    logger.info(ext)
    os.makedirs("./all_files/converted", exist_ok=True)
    
    src = f'./all_files/uploads/{file_name}'
    xliff_file = f'./all_files/converted/{converted_name}'
    
    if ext == ".html": 
        html_to_xliff(src, xliff_file) 
          
    elif ext == ".strings": 
        string_to_xliff(src, xliff_file) 
       
    elif ext == ".odt":
        odf_to_xliff(src, xliff_file)
        
    elif ext == ".xml":
        android_to_xliff(src, xliff_file) 
        
        
    else:
        logger.error("Unsupported extension: %s", ext)
        return "Unsupported file type!", 400
    
    
    upload_blob_xliff(f"./all_files/converted/{converted_name}", f"{converted_name}")    
    translate_xliff(converted_name, language)
    time.sleep(2)
    blob_download_xliff(converted_name)
    
    return "Conversion started!", 200



 