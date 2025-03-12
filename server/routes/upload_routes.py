from flask import Blueprint, request, jsonify, redirect, render_template, url_for, session
import os
import logging
import uuid
import requests
from azure.upload_blob import upload_blob
from extensions import cache
from custom_logger import logger
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user_model import User
# Set up logging

upload = Blueprint('upload', __name__)

UPLOAD_FOLDER = './all_files/uploads'

UPLOAD_AUDIO_FOLDER = './all_files/audio'

UPLOAD_ENHANCED_FOLDER = './all_files/enhanced_audio_input'

# create folders if not there
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if not os.path.exists(UPLOAD_AUDIO_FOLDER):
    os.makedirs(UPLOAD_AUDIO_FOLDER)
    
if not os.path.exists(UPLOAD_ENHANCED_FOLDER):
    os.makedirs(UPLOAD_ENHANCED_FOLDER)


@upload.route('/upload', methods=['POST'])
@jwt_required()
def upload_file():
    user_id = get_jwt_identity()  
    logger.info(user_id) 
     
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    # file name is taken, extension is taken from original file name, and original file name is saved.
    # original name is saved, and then uuid name is assigned for file_name.
    file = request.files['file']
    original_name = file.filename
    extension = os.path.splitext(original_name)[1]
    original_name = os.path.splitext(original_name)[0]
    
    #base_name is just filename without the extension so you can modify it later, file_path is not used yet
    base_name = str(uuid.uuid4())
    file_name = base_name + extension
    file_path = os.path.join(UPLOAD_FOLDER, file_name)
    
    cache.set('file_path', file_path, timeout=300)
    cache.set(f'file_name_{user_id}', file_name, timeout=300)
    cache.set('extension', extension, timeout=300)
    
    #base name is to take name and add different extnesion
    cache.set(f'base_name_{user_id}', base_name, timeout=300)
    
    #original name is for naming the file at the end, don't use it for getting file 
    cache.set(f"original_name_{user_id}", original_name, timeout=300)
    
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
    

@upload.route('/upload_audio', methods=['POST'])
@jwt_required()
def upload_audio_file():
    user_id = get_jwt_identity()  
    logger.info(user_id) 
     
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    # Extract file details
    file = request.files['file']
    original_name = file.filename
    extension = os.path.splitext(original_name)[1]
    original_name = os.path.splitext(original_name)[0]
    
    base_name = str(uuid.uuid4())
    file_name = base_name + extension
    file_path = os.path.join(UPLOAD_AUDIO_FOLDER, file_name)
    
    # Store metadata in cache
    cache.set('file_path', file_path, timeout=300)
    cache.set(f'file_name_{user_id}', file_name, timeout=300)
    cache.set('extension', extension, timeout=300)
    cache.set(f'base_name_{user_id}', base_name, timeout=300)
    cache.set(f"original_name_{user_id}", original_name, timeout=300)
    
    logger.info(f"Stored file to cache: {file_name}")

    # Save file locally
    file.save(file_path)

    # Return response
    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path
    })


@upload.route('/upload-enhanced-audio', methods=['POST'])
@jwt_required()
def upload_audio_enchanced_file():
    user_id = get_jwt_identity()  
    logger.info(user_id) 
     
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    # Extract file details
    file = request.files['file']
    original_name = file.filename
    extension = os.path.splitext(original_name)[1]
    original_name = os.path.splitext(original_name)[0]
    
    base_name = str(uuid.uuid4())
    file_name = base_name + extension
    file_path = os.path.join(UPLOAD_ENHANCED_FOLDER, file_name)
    
    # Store metadata in cache
    cache.set('file_path', file_path, timeout=300)
    cache.set(f'file_name_{user_id}', file_name, timeout=300)
    cache.set('extension', extension, timeout=300)
    cache.set(f'base_name_{user_id}', base_name, timeout=300)
    cache.set(f"original_name_{user_id}", original_name, timeout=300)
    
    logger.info(f"Stored file to cache: {file_name}")

    # Save file locally
    file.save(file_path)

    # Return response
    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path
    })