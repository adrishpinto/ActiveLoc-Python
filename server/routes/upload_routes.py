from flask import Blueprint, request, jsonify
import os
import logging
from azure.upload_func import upload_blob
from flask import session
from extensions import cache
import uuid 


# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

upload = Blueprint('upload', __name__)

UPLOAD_FOLDER = 'uploads'

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@upload.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    full_name = file.filename
    extension = os.path.splitext(full_name)[1]
    
    file_name = str(uuid.uuid4()) + extension
    file_path = os.path.join(UPLOAD_FOLDER, file_name)
    cache.set('file_path', file_path, timeout=300)
    cache.set('file_name', file_name, timeout=300)
    cache.set('extension', extension, timeout=300)
    
    print(f"Stored file path in Redis: {cache.get('file_name')}")

    file.save(file_path)
    

   
    try:
        azure_response = upload_blob(file_path, file_name)
        logger.info(f"File uploaded to Azure: {azure_response}")
    except Exception as e:
        logger.error(f"Error uploading file to Azure: {str(e)}")
        return jsonify({'error': 'Azure upload failed'}), 500

    # Return response
    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path,
        'azure_response': azure_response
    })
