import os
import uuid
import time
from flask import Blueprint, request, jsonify, send_from_directory
import azure.cognitiveservices.speech as speechsdk

t2s_bp = Blueprint('speech', __name__)

# Retrieve environment variables
speech_key = os.environ.get('SPEECH_KEY')
speech_region = os.environ.get('SPEECH_REGION')

# Validate environment variables
if not speech_key or not speech_region:
    raise ValueError("Missing SPEECH_KEY or SPEECH_REGION environment variables. Set them before running.")

# Set output directory
OUTPUT_FOLDER = "all_files/Text2Speech"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)  # Ensure the directory exists

@t2s_bp.route('/synthesize', methods=['POST'])
def synthesize_speech():
    data = request.json
    text = data.get('text')
    voice = data.get('voice', 'en-US-AndrewNeural')  
    rate = data.get('rate', '0%')
    pitch = data.get('pitch', '0%')
    
    if pitch == 0 or not pitch:
        pitch = "0%"
    
    if rate == 0 or not rate:
        rate = "0%"

    if not text:
        return jsonify({"error": "No text provided"}), 400

    
    unique_id = f"{int(time.time())}_{uuid.uuid4().hex[:8]}"
    audio_filename = f"output_{unique_id}.wav"
    audio_path = os.path.join(OUTPUT_FOLDER, audio_filename)

    
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=speech_region)
    speech_config.speech_synthesis_voice_name = voice

   
    audio_config = speechsdk.audio.AudioOutputConfig(filename=audio_path)
    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)
    
    ssml_text = f"""
    <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>
        <voice name='{voice}'>
            <prosody rate='{rate}' pitch='{pitch}'>{text}</prosody>
        </voice>
    </speak>
    """
    
  
    speech_synthesis_result = speech_synthesizer.speak_ssml_async(ssml_text).get()
    
   
    if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        return jsonify({"message": "Speech synthesized successfully", "file": f"/files/{audio_filename}"})
    elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_synthesis_result.cancellation_details
        return jsonify({"error": "Speech synthesis canceled", "reason": str(cancellation_details.reason)}), 500

@t2s_bp.route('/files/<path:filename>')
def serve_audio(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)
