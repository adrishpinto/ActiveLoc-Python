from flask import Blueprint, jsonify, send_file, request
from functions.text2speech_batch.batch_download import text_to_speech
from functions.text2speech_batch.extract_text_func import extract_text
from functions.text2speech_batch.rename import rename_files

from extensions import cache
from custom_logger import logger
from uuid import uuid4
import os 
import time
from decorator.decorator import group_required
from flask_jwt_extended import jwt_required
# Define the blueprint
t2s_batch = Blueprint('t2s_batch', __name__)

@t2s_batch.route('/t2s_batch', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def t2s_batch_func():
    data = request.get_json()
    voice = data.get("voice")
    pitch = data.get("pitch")
    rate = data.get("rate")
    custom_names = data.get("custom_names", [])  
    
    # uploaded folder path
    folder_path = cache.get("t2s_folder_name")
    
    if folder_path is None:
        return jsonify({"error": "Please upload a file first"}), 400

    logger.info(f"folder: {folder_path}")

    folder_name = str(uuid4())

    text = extract_text(folder_path)
    logger.info(text)
    time.sleep(2)  
    output_file = text_to_speech(voice, text, folder_name, rate, pitch)
    
    print(f"Speech synthesis completed: {output_file}")

    # Use filenames from request body
    rename_files(f"./all_files/t2s_batch/{folder_name}.zip", custom_names)

    zip_path = f'./all_files/t2s_batch/{folder_name}_updated.zip'

    if not os.path.exists(zip_path):
        return jsonify({"error": "Updated zip file not found"}), 500

    try:
        return send_file(zip_path, as_attachment=True)
    except Exception as e:
        logger.error(f"Error: {e}")
        return jsonify({"error": "File download failed"}), 500

