import subprocess
import platform
from flask import Blueprint, jsonify, request, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import cache
from azure.upload_blob_xliff import upload_blob_xliff
from azure.translate_xliff import translate_xliff
from custom_logger import logger
import os

merge_tikal_bp = Blueprint('merge_tikal_bp', __name__)

@merge_tikal_bp.route("/merge-file", methods=['POST'])
@jwt_required()
def merge():
    user_id = get_jwt_identity()
    file_name = cache.get(f"file_name_mtpe_{user_id}")

    if not file_name:
        return jsonify({"error": "No file found for merging"}), 400

   #  is_windows = platform.system() == "Windows"

   #  if is_windows:
   #      command = f"tikal -m ./all_files/merge_files/{file_name}.xlf"
   #      result = subprocess.run(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
   #  else:
   
    command = ["tikal.sh", "-m", f"./all_files/merge_files/{file_name}.xlf"]
    result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    logger.info(f"{file_name}")
    logger.info(f"{command}")

    name, ext = os.path.splitext(file_name)
    file_path = f"./all_files/merge_files/{name}.out{ext}"

    if result.stderr:
        return jsonify({"error": f"Merge failed: {result.stderr}"}), 400

    return send_file(file_path, as_attachment=True)
