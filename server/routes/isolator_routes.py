import os
from flask import Blueprint, Response, jsonify
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import cache

load_dotenv()

isolator_bp = Blueprint("isolator", __name__)

client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

UPLOAD_FOLDER = "./all_files/enhanced_audio_input"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@isolator_bp.route("/isolate-audio", methods=["POST"])
@jwt_required()
def process_audio():
    user_id = get_jwt_identity()
    file_name = cache.get(f"file_name_{user_id}")
    input_path = os.path.join(UPLOAD_FOLDER, file_name)

    if not os.path.exists(input_path):
        return jsonify({"error": "Input file not found"}), 404

    try:
        with open(input_path, "rb") as file:
            audio_data = file.read()  # Read file into memory

        audio_stream = client.audio_isolation.audio_isolation(audio=audio_data)  # Pass data instead of file object

        def generate():
            for chunk in audio_stream:
                yield chunk 

        return Response(generate(), content_type="audio/mpeg")  

    except Exception as e:
        return jsonify({"error": str(e)}), 500
