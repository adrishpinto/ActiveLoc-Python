import os
import uuid
import requests

# Get API key and region from environment variables
speech_key = os.environ.get("SPEECH_KEY")
speech_region = os.environ.get("SPEECH_REGION")

if not speech_key or not speech_region:
    raise ValueError("Missing SPEECH_KEY or SPEECH_REGION environment variables")

# Generate a random Synthesis ID
synthesis_id = str(uuid.uuid4())

# API URL
url = f"https://{speech_region}.api.cognitive.microsoft.com/texttospeech/batchsyntheses/{synthesis_id}?api-version=2024-04-01"

headers = {
    "Ocp-Apim-Subscription-Key": speech_key,
    "Content-Type": "application/json"
}

data = {
    "description": "my ssml test",
    "inputKind": "PlainText",
    "inputs": [{"content": "The rainbow has seven colors and now it is more than that the file should be increase by a few seconds now since its more"}],
    "properties": {
        "outputFormat": "riff-24khz-16bit-mono-pcm",
        "wordBoundaryEnabled": False,
        "sentenceBoundaryEnabled": False,
        "concatenateResult": False,
        "decompressOutputFiles": False
    },
    "synthesisConfig": {
        "voice": "en-US-JennyNeural"
    }
}

response = requests.put(url, headers=headers, json=data)
print(response.status_code, response.json())
