from dotenv import load_dotenv
from io import BytesIO
import requests
from elevenlabs.client import ElevenLabs
import os 

load_dotenv()

client = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

audio_file_path = "../../all_files/audio/test.mp3"

with open(audio_file_path, "rb") as audio_data:
    transcription = client.speech_to_text.convert(
        file=audio_data,
        model_id="scribe_v1",
        tag_audio_events=True,
        language_code="eng",
        diarize=True,
    )


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


with open("test.txt", "w") as file:
    for item in formatted_words:
        file.write(item + "\n" + "\n")
        print(item)
















    
 















