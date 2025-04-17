import subprocess
import platform
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import cache
from azure.upload_blob_xliff import upload_blob_xliff
from azure.translate_xliff import translate_xliff
from decorator.decorator import group_required



convert_tikal_bp = Blueprint('convert_tikal_bp', __name__)

@convert_tikal_bp.route("/convert-file", methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def convert():
    user_id = get_jwt_identity()
    file_name = cache.get(f"file_name_{user_id}")
    
    
    if not file_name:
        return jsonify({"error": "No file found for conversion"}), 400
    
    converted_name = file_name + ".xlf"
    
    srcLanguage = request.get_json().get('srcLanguage', 'en-IN')
    trgLanguage = request.get_json().get('trgLanguage', 'en-IN')

    # Detect OS
    is_windows = platform.system() == "Windows"


    if is_windows:
        command = f"tikal -x ./all_files/mtpe_uploads/{file_name} -nocopy -sl {srcLanguage} -tl {trgLanguage} -seg seg.srx"
        result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    else:
        command = [
            "tikal.sh", "-x", f"./all_files/mtpe_uploads/{file_name}",
            "-nocopy", "-sl", srcLanguage, "-tl", trgLanguage
        ]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    if result.stderr:
        return jsonify({"error": f"Conversion failed: {result.stderr}"}), 400

    # Upload and translate after successful conversion
    upload_blob_xliff(f"./all_files/mtpe_uploads/{converted_name}", f"{converted_name}")    
    translate_xliff(converted_name, trgLanguage)

    return jsonify({"message": "Conversion successful", "output": converted_name}), 200
