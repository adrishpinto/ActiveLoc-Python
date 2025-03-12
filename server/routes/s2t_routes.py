from flask import Blueprint, jsonify
from dotenv import load_dotenv
import os
from elevenlabs.client import ElevenLabs
import pickle
from custom_logger import logger 
from extensions import cache
from flask_jwt_extended import jwt_required, get_jwt_identity

load_dotenv()

speech_bp = Blueprint("speech", __name__)

client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

@speech_bp.route("/transcribe", methods=["POST"])
@jwt_required()
def transcribe():
    try:
        user_id = get_jwt_identity()
        file_name = cache.get(f"file_name_{user_id}")
        
        if not file_name:
            return "File name not found in cache.", 400  

        audio_file_path = f"./all_files/audio/{file_name}"
        
        with open(audio_file_path, "rb") as audio_data:
            transcription = client.speech_to_text.convert(
                file=audio_data,
                model_id="scribe_v1",
                tag_audio_events=True,
                language_code="eng",
                diarize=True,
            )
        
        with open(f"./all_files/audio_output/{file_name}.pkl", "wb") as file:
            pickle.dump(transcription, file)

        return jsonify({"success": True, "message": "Transcription complete and saved to file."}), 200

    except Exception as e:
        return str(e), 500    


@speech_bp.route("/transcribe-text", methods=["POST"])
@jwt_required()
def transcribe_audio():
    try:
        user_id = get_jwt_identity()
        file_name = cache.get(f"file_name_{user_id}")
        
        if not file_name:
            return jsonify({"error": "File name not found in cache."}), 400  
        
        input_path = f"./all_files/audio_output/{file_name}.pkl"
        
        with open(input_path, "rb") as file:
            transcription = pickle.load(file)

        return jsonify({"message": "Transcription retrieved successfully.", "text": transcription.text}), 200  
    except Exception as e:
        return jsonify({"error": str(e)}), 500  
 

@speech_bp.route("/transcribe-dialogue", methods=["POST"])
@jwt_required()
def transcribe_dialogue():
    try:
        user_id = get_jwt_identity()
        file_name = cache.get(f"file_name_{user_id}")
        
        if not file_name:
            return jsonify({"error": "File name not found in cache."}), 400  
        
        input_path = f"./all_files/audio_output/{file_name}.pkl"
        
        with open(input_path, "rb") as file:
            transcription = pickle.load(file)
        
        last_speaker_id = None  
        formatted_words = []

        for index in range(0, len(transcription.words), 2):
            word = transcription.words[index]

            if word.speaker_id != last_speaker_id:
                if last_speaker_id is not None:
                    formatted_words.append(f"{last_speaker_id}: {' '.join(current_words)}")
                current_words = [word.text]
                last_speaker_id = word.speaker_id
            else:
                current_words.append(word.text)

        if last_speaker_id is not None:
            formatted_words.append(f"{last_speaker_id}: {' '.join(current_words)}")
        
        return jsonify({"message": "Dialogue transcription complete.", "dialogue": formatted_words}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@speech_bp.route("/transcribe-srt", methods=["POST"])
@jwt_required()
def transcribe_srt():
    try:
        user_id = get_jwt_identity()
        file_name = cache.get(f"file_name_{user_id}")
        
        if not file_name:
            return jsonify({"error": "File name not found in cache."}), 400  
        
        input_path = f"./all_files/audio_output/{file_name}.pkl"
        
        with open(input_path, "rb") as file:
            transcription = pickle.load(file)
        
        formatted = [
            {
                "start": f"00:00:{str(transcription.words[i].start).zfill(2)}",
                "end": f"00:00:{str(transcription.words[min(i+10, len(transcription.words)-1)].start).zfill(2)}",
                "text": ' '.join(transcription.words[j].text for j in range(i, min(i+12, len(transcription.words)), 2))
            }
            for i in range(0, len(transcription.words), 12)
        ]
        
        return jsonify({"message": "SRT transcription complete.", "subtitles": formatted}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
