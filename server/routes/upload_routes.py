from flask import Blueprint, request, jsonify, redirect, render_template, url_for, session
import os
import logging
import uuid
import requests
from azure.upload_blob import upload_blob
from extensions import cache
import app_config
from custom_logger import logger


# Set up logging

upload = Blueprint('upload', __name__)

UPLOAD_FOLDER = './all_files/uploads'

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@upload.route('/upload', methods=['POST'])

def upload_file():
    from app import auth
    token = auth.get_token_for_user(app_config.SCOPE)
    if "error" in token:
        return redirect(url_for("login"))
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    full_name = file.filename
    extension = os.path.splitext(full_name)[1]
    base_name = str(uuid.uuid4())
    file_name = base_name + extension
    file_path = os.path.join(UPLOAD_FOLDER, file_name)
    
    cache.set('file_path', file_path, timeout=300)
    cache.set('file_name', file_name, timeout=300)
    cache.set('extension', extension, timeout=300)
    cache.set('base_name', base_name, timeout=300)
    
    logger.info(f"Stored file to cache: {cache.get('file_name')}")

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
