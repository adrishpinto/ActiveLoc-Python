from dotenv import load_dotenv
import os
from elevenlabs.client import ElevenLabs
load_dotenv()

client = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

audio_file_path = "../../all_files/audio/sample2.mp3"

with open(audio_file_path, "rb") as audio_data:
    transcription = client.speech_to_text.convert(
        file=audio_data,
        model_id="scribe_v1",
        tag_audio_events=True,
        language_code="eng",
        diarize=True,
    )

formatted = "\n".join(
    f"00:00:{str(transcription.words[i].start).zfill(2)} --> 00:00:{str(transcription.words[min(i+10, len(transcription.words)-1)].start).zfill(2)}\n"
    f"{' '.join(transcription.words[j].text for j in range(i, min(i+12, len(transcription.words)), 2))}\n"
    for i in range(0, len(transcription.words), 12)
)

print(transcription)
