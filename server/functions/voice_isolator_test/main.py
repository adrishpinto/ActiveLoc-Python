import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs import play

load_dotenv()

client = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

# Define input and output file paths
file_path = "sample.mp3"  # Ensure this file exists
output_file_path = "processed_sample.mp3"  # Output file for processed audio

# Open the input file and process it
with open(file_path, "rb") as audio_file:
    # Process audio isolation (returns a generator)
    audio_stream = client.audio_isolation.audio_isolation(audio=audio_file)

    # Save the processed audio to a file
    with open(output_file_path, "wb") as output_file:
        for chunk in audio_stream:  # Iterate through the generator and write chunks
            output_file.write(chunk)

# Play the processed audio
with open(output_file_path, "rb") as saved_audio:
    play(saved_audio)

print(f"Processed audio saved as {output_file_path}")
