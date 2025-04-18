import os
import uuid
import requests
#for running as script remove the use extract_text_func and but change it to .extract_text_func to make it work
from .extract_text_func import extract_text
import time
def text_to_speech(voice: str, texts: list, synthesis_id: str, rate: str, pitch: str):
    speech_key = os.getenv("SPEECH_KEY")
    speech_region = os.getenv("SPEECH_REGION")
    if not speech_key or not speech_region:
        print("Missing API credentials")
        exit(0)
    
    url = f"https://{speech_region}.api.cognitive.microsoft.com/texttospeech/batchsyntheses/{synthesis_id}?api-version=2024-04-01"
    headers = {"Ocp-Apim-Subscription-Key": speech_key, "Content-Type": "application/json"}
    
    data = {
        "description": "SSML synthesis",
        "inputKind": "PlainText",
        "inputs": [{"content": text} for text in texts],
        "properties": {
            "outputFormat": "riff-24khz-16bit-mono-pcm",
            "wordBoundaryEnabled": False,
            "sentenceBoundaryEnabled": False,
            "concatenateResult": False,
            "decompressOutputFiles": False
        },
        "synthesisConfig": {"voice": voice, "pitch": pitch, "rate": rate}
    }
    
    
    response = requests.put(url, headers=headers, json=data)
    if response.status_code != 201:
        raise ValueError(f"Synthesis request failed: {response.json()}")
    print("Synthesis started.")
    
    # res
    max_attempts = 20 
    for attempt in range(max_attempts):
        response = requests.get(url, headers={"Ocp-Apim-Subscription-Key": speech_key}, timeout=10)
        response.raise_for_status()
        
        output_url = response.json().get("outputs", {}).get("result")
        if output_url:
            break 
        print(f"Retrying as no URL found")
        time.sleep(3)
    else:
        raise TimeoutError("Timed out waiting for the result URL.")
    
    
    download_response = requests.get(output_url, timeout=30)
    download_response.raise_for_status()
    
    output_filename = f"./all_files/t2s_batch/{synthesis_id}.zip"
    output_dir = os.path.dirname(output_filename) 

    os.makedirs(output_dir, exist_ok=True)

    with open(output_filename, "wb") as file:
        file.write(download_response.content)
        
    print(f"Download complete: {output_filename}")
    return output_filename


if __name__ == "__main__":
    text = extract_text("test")
    voice = "en-US-JennyNeural"
    texts = text
    output_file = text_to_speech( voice, texts, "22223")
    print(f"Speech synthesis completed: {output_file}")
