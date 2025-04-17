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
from .delete_file_func import delete_after_delay
from decorator.decorator import group_required

upload = Blueprint('upload', __name__)

UPLOAD_FOLDER = './all_files/uploads'

UPLOAD_MTPE_FOLDER = './all_files/mtpe_uploads'

UPLOAD_AUDIO_FOLDER = './all_files/audio'

UPLOAD_ENHANCED_FOLDER = './all_files/enhanced_audio_input'

UPLOAD_T2S_FOLDER = './all_Files/t2s_batch'

UPLOAD_MERGE_FOLDER = './all_files/merge_files'

UPLOAD_WORKBENCH_FOLDER = './all_files/workbench_files'

# create folders if not there
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    
if not os.path.exists(UPLOAD_MTPE_FOLDER):
    os.makedirs(UPLOAD_MTPE_FOLDER)

if not os.path.exists(UPLOAD_AUDIO_FOLDER):
    os.makedirs(UPLOAD_AUDIO_FOLDER)
    
if not os.path.exists(UPLOAD_ENHANCED_FOLDER):
    os.makedirs(UPLOAD_ENHANCED_FOLDER)

if not os.path.exists(UPLOAD_T2S_FOLDER):
    os.makedirs(UPLOAD_T2S_FOLDER)
    
if not os.path.exists(UPLOAD_MERGE_FOLDER):
    os.makedirs(UPLOAD_MERGE_FOLDER)
    
if not os.path.exists(UPLOAD_WORKBENCH_FOLDER):
    os.makedirs(UPLOAD_WORKBENCH_FOLDER)
    
    
    
#azure file upload for mtpe
@upload.route('/upload', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
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
    
    cache.set('file_path', file_path, timeout=1300)
    cache.set(f'file_name_{user_id}', file_name, timeout=1300)
    cache.set(f'extension_{user_id}', extension, timeout=1300)
    
    cache.set(f'base_name_{user_id}', base_name, timeout=1300)
    
    cache.set(f"original_name_{user_id}", original_name, timeout=1300)
    
    logger.info(f"Stored file to cache: {cache.get('file_name')}")

    file.save(file_path)
    delete_after_delay(file_path, delay=1200)
   
    try:
        azure_response = upload_blob(file_path, file_name, "source")
        logger.info(f"File uploaded to Azure: {azure_response}")
    except Exception as e:
        logger.error(f"Error uploading file to Azure: {str(e)}")
        return jsonify({'error': 'Azure upload failed'}), 500

    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path,
        'azure_response': azure_response
    })
    
@upload.route('/upload-workbench', methods=['POST'])
@group_required(["Admin", "Sales", "Operations", "Vendor"])
@jwt_required()
def upload_workbench_file():
    user_id = get_jwt_identity()
    
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    original_name = file.filename
    extension = os.path.splitext(original_name)[1]
    original_name = os.path.splitext(original_name)[0]
    
    base_name = str(uuid.uuid4())
    file_name = base_name + extension
    file_path = os.path.join(UPLOAD_WORKBENCH_FOLDER, file_name)
    
    cache.set('file_path', file_path, timeout=1300)
    cache.set(f'file_name_wb_{user_id}', file_name, timeout=1300)
    cache.set(f'extension_{user_id}', extension, timeout=1300)
    
    cache.set(f'base_name_{user_id}', base_name, timeout=1300)
    
    cache.set(f"original_name_{user_id}", original_name, timeout=1300)
    file.save(file_path)
    delete_after_delay(file_path, delay=1200)
    
    try:
        logger.info(f"File uploaded")
        logger.info(cache.get(f"file_name_wb_{user_id}"))
    except Exception as e:
        logger.error(f"Error uploading file {str(e)}")
        return jsonify({'error': 'failed'}), 500

    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path,
    })


    
@upload.route('/upload-merge-original', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations", "Vendor"])
def upload_merge_original():
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
    file_path = os.path.join(UPLOAD_MERGE_FOLDER, file_name)
    
    cache.set('file_path', file_path, timeout=1300)
    cache.set(f'file_name_mtpe_{user_id}', file_name, timeout=1300)
    cache.set(f'extension_{user_id}', extension, timeout=1300)
    
    cache.set(f'base_name_{user_id}', base_name, timeout=1300)
    
    cache.set(f"original_name_{user_id}", original_name, timeout=1300)
    
    logger.info(f"Stored file to cache: {cache.get('file_name')}")

    file.save(file_path)
    delete_after_delay(file_path, delay=1200)
   
    try:
        logger.info(f"File uploaded")
    except Exception as e:
        logger.error(f"Error uploading file {str(e)}")
        return jsonify({'error': 'failed'}), 500

    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path,
    })
    

@upload.route('/upload-merge-xlf', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations", "Vendor"])
def upload_merge_xlf():
    user_id = get_jwt_identity()  
    logger.info(user_id) 
     
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']

    file_name = cache.get(f'file_name_mtpe_{user_id}')
    file_name = file_name + ".xlf"
    file_path = os.path.join(UPLOAD_MERGE_FOLDER, file_name)
    
    logger.info(f"Stored file to cache: {cache.get('file_name')}")

    file.save(file_path)
    delete_after_delay(file_path, delay=1200)
   
    try:
        logger.info(f"File uploaded")
    except Exception as e:
        logger.error(f"Error uploading file {str(e)}")
        return jsonify({'error': 'Azure failed'}), 500

    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path,
    })

    
@upload.route('/upload-mtpe', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def upload_file_mtpe():
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
    file_path = os.path.join(UPLOAD_MTPE_FOLDER, file_name)
    
    cache.set('file_path', file_path, timeout=1300)
    cache.set(f'file_name_{user_id}', file_name, timeout=1300)
    cache.set(f'extension_{user_id}', extension, timeout=1300)
    
    cache.set(f'base_name_{user_id}', base_name, timeout=1300)
    
    cache.set(f"original_name_{user_id}", original_name, timeout=1300)
    
    logger.info(f"Stored file to cache: {cache.get('file_name')}")

    file.save(file_path)
    delete_after_delay(file_path, delay=1200)
   
    try:
        azure_response = upload_blob(file_path, file_name, "mtpe-template")
        logger.info(f"File uploaded")
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        return jsonify({'error': 'upload failed'}), 500

    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path,
        'azure_res': azure_response
    })




@upload.route('/upload_audio', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def upload_audio_file():
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
    file_path = os.path.join(UPLOAD_AUDIO_FOLDER, file_name)
    
    
    cache.set('file_path', file_path, timeout=1300)
    cache.set(f'file_name_{user_id}', file_name, timeout=1300)
    cache.set(f'extension_{user_id}', extension, timeout=1300)
    cache.set(f'base_name_{user_id}', base_name, timeout=1300)
    cache.set(f"original_name_{user_id}", original_name, timeout=1300)
    
    logger.info(f"Stored file to cache: {file_name}")

 
    file.save(file_path)
    delete_after_delay(file_path, delay=1200)
    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path
    })
    
    
    


@upload.route('/upload-enhanced-audio', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
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
    
   
    cache.set('file_path', file_path, timeout=1300)
    cache.set(f'file_name_{user_id}', file_name, timeout=1300)
    cache.set(f'extension_{user_id}', extension, timeout=1300)
    cache.set(f'base_name_{user_id}', base_name, timeout=1300)
    cache.set(f"original_name_{user_id}", original_name, timeout=1300)
    
    logger.info(f"Stored file to cache: {file_name}")

    
    file.save(file_path)
    delete_after_delay(file_path, delay=1200)
    
    return jsonify({
        'message': 'File uploaded successfully',
        'filename': file_name,
        'file_path': file_path
    })
    


@upload.route('/upload_folder', methods=['POST'])
@jwt_required()
@group_required(["Admin", "Sales", "Operations"])
def upload_folder():
    user_id = get_jwt_identity()  
    logger.info(user_id) 
    if 'files' not in request.files:
        return jsonify({'error': 'No files part'}), 400
    
    files = request.files.getlist('files')  
    saved_files = []
    unique = str(uuid.uuid4())
    logger.info(UPLOAD_T2S_FOLDER)
    folder_name = UPLOAD_T2S_FOLDER + "/" + unique
    
    cache.set('t2s_folder_name', folder_name, timeout=1300)
    
    
    os.makedirs(folder_name)
    
    for file in files:
        if file.filename == '':
            continue  

        file_path = os.path.join(folder_name, file.filename)
        file.save(file_path)
        delete_after_delay(file_path, delay=1200)
        saved_files.append(file.filename)

    if saved_files:
        return jsonify({'message': 'Files uploaded successfully', 'files': saved_files}), 200
    else:
        return jsonify({'error': 'No valid files uploaded'}), 400
    
    
    
    
    
    
    
    
    
    
