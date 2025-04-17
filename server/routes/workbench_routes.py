import os
import subprocess
import platform
from flask import Blueprint, jsonify, request, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import cache
from custom_logger import logger
from functions.workbench.array_from_xlf import extract_xlf
from azure.upload_blob_xliff import upload_blob_xliff
from azure.translate_xliff import translate_xliff
from azure.blob_download import blob_download
from functions.workbench.update_xlf import update_xlf
from functions.workbench.decode import decode
from decorator.decorator import group_required
workbench_bp = Blueprint("workbench", __name__)


@workbench_bp.route('/load-workbench', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations", "Vendor"])
def workbench_load():    
    user_id = get_jwt_identity()
    file_name = cache.get(f"file_name_wb_{user_id}")
    
    if not file_name:
        return jsonify({"error": "No file found for conversion"}), 400
    
    converted_name = file_name + ".xlf"
    
    srcLanguage = request.get_json().get('srcLanguage', 'en')
    trgLanguage = request.get_json().get('trgLanguage', 'fr')

    # Detect OS
    is_windows = platform.system() == "Windows"


    if is_windows:
        command = f"tikal -x ./all_files/workbench_files/{file_name} -nocopy -sl {srcLanguage} -tl {trgLanguage} -seg seg.srx"
        result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    else:
        command = [
            "tikal.sh", "-x", f"./all_files/workbench_files/{file_name}",
            "-nocopy", "-sl", srcLanguage, "-tl", trgLanguage, "-seg", "seg.srx"
        ]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    
    if result.stderr:
        return jsonify({"error": f"Conversion failed: {result.stderr}"}), 400

    upload_blob_xliff(f"./all_files/workbench_files/{converted_name}", f"{converted_name}")    
    translate_xliff(converted_name, trgLanguage)
    blob_download(converted_name, "target-xliff")
    
    file_path = f"./all_files/workbench_files/{converted_name}"
    logger.info(file_path)
    try:
        if not file_path or not os.path.exists(file_path):
            return jsonify({"error": "File not found"}), 404

        sources, targets = extract_xlf(file_path)
        
        sources = decode(sources)
        targets = decode(targets)
        print(sources)
        print(targets)
        return jsonify({
            "message": "Successfully loaded",
            "sources": sources,
            "targets": targets
        }), 200

    except Exception as e:
        return jsonify({"error": "An error occurred while loading the file", "details": str(e)}), 500



@workbench_bp.route('/workbench-update', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations", "Vendor"])
def workbench_update():
    user_id = get_jwt_identity()
    file_name = cache.get(f"file_name_wb_{user_id}")
    
    if not file_name:
        return jsonify({"error": "No file found to update"}), 400

    converted_name = file_name + ".xlf"
    file_path = f"./all_files/workbench_files/{converted_name}"
    
    if not os.path.exists(file_path):
        return jsonify({"error": "Converted XLF file not found"}), 404

    data = request.get_json()
    new_targets = data.get("targets")

    if not new_targets or not isinstance(new_targets, list):
        return jsonify({"error": "Invalid or missing 'targets' array"}), 400

    try:
        update_xlf(file_path, new_targets)

        return send_file(
            file_path,
            as_attachment=True,
            download_name=converted_name,
            mimetype='application/xml'
        )
    except Exception as e:
        logger.error(f"Failed to update XLF: {e}")
        return jsonify({"error": "Failed to update XLF", "details": str(e)}), 500