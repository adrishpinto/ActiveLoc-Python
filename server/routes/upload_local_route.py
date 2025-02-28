from flask import Blueprint, request, jsonify
import os
import logging
import uuid
from extensions import cache
from custom_logger import logger
from flask_jwt_extended import jwt_required, get_jwt_identity

upload_local= Blueprint('upload_local', __name__)

UPLOAD_FOLDER = './all_files/uploads'

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@upload_local.route('/upload_local', methods=['POST'])
@jwt_required()
def upload_file():
    user_id = get_jwt_identity()  
    logger.info(user_id) 
     
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    original_name = file.filename
    extension = os.path.splitext(original_name)[1]
    original_name = os.path.splitext(original_name)[0]
    
    base_name = str(uuid.uuid4())
    file_name = base_name + extension
    file_path = os.path.join(UPLOAD_FOLDER, file_name)
    
    cache.set('file_path', file_path, timeout=300)
    cache.set(f'file_name_{user_id}', file_name, timeout=300)
    cache.set('extension', extension, timeout=300)
    cache.set(f'base_name_{user_id}', base_name, timeout=300)
    cache.set(f"original_name_{user_id}", original_name, timeout=300)
    
    logger.info(f"Stored file to cache: {file_name}")

    file.save(file_path)

    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path
    })
