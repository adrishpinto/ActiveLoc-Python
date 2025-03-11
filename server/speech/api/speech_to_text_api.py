from flask import Blueprint, jsonify
from dotenv import load_dotenv
import os
from elevenlabs.client import ElevenLabs

load_dotenv()

speech_bp = Blueprint("speech", __name__)

client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

@speech_bp.route("/transcribe", methods=["POST"])
def transcribe_audio():
    try:
        audio_file_path = "../all_files/audio/sample.mp3"
        
        with open(audio_file_path, "rb") as audio_data:
            transcription = client.speech_to_text.convert(
                file=audio_data,
                model_id="scribe_v1",
                tag_audio_events=True,
                language_code="eng",
                diarize=True,
            )
        
        return jsonify({"transcription": transcription.text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
