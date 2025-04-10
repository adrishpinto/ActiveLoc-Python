from dotenv import load_dotenv
import os
from elevenlabs.client import ElevenLabs

load_dotenv()

client = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

audio_file_path = "../../all_files/audio/sample3.mp3"

with open(audio_file_path, "rb") as audio_data:
    transcription = client.speech_to_text.convert(
        file=audio_data,
        model_id="scribe_v1",
        tag_audio_events=True,
        language_code="eng",
        diarize=True,
    )

print(transcription.text)
