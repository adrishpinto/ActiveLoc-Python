import subprocess
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from extensions import cache
from flask_jwt_extended import jwt_required, get_jwt_identity
from azure.upload_blob_xliff import upload_blob_xliff
from azure.translate_xliff import translate_xliff
import time
from flask import Flask, request, jsonify

convert_tikal_bp = Blueprint('convert_tikal_bp', __name__)

@convert_tikal_bp.route("/convert-file", methods=['POST'])
@jwt_required()
def convert():
    user_id = get_jwt_identity()
    file_name = cache.get(f"file_name_{user_id}")
    converted_name = file_name + ".xlf"
    
    srcLanguage = request.get_json().get('srcLanguage', 'en-IN')
    trgLanguage = request.get_json().get('trgLanguage', 'en-IN')
    
    command = f"tikal -x ./all_files/mtpe_uploads/{file_name} -nocopy -sl {srcLanguage} -tl {trgLanguage}"
    
    result = subprocess.run(["powershell", "-Command", command], 
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    upload_blob_xliff(f"./all_files/mtpe_uploads/{converted_name}", f"{converted_name}")    
    translate_xliff(converted_name, trgLanguage)
    
    if result.stderr:  
        return jsonify({"error": "Conversion failed. Please make sure the file extension is correct."}), 400

    return jsonify({"message": "Conversion successful", "output": f"{file_name}.xlf"}), 200

