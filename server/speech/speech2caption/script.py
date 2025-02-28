import subprocess
import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
load_dotenv(dotenv_path)

def run_captioning(input_file, output_file, format_type='mp3', srt=True, real_time=False, threshold=5, delay=0, profanity='mask'):
    command = [
        "python", "captioning.py",
        "--input", input_file,
        "--format", format_type,
        "--output", output_file,
        "--threshold", str(threshold),
        "--delay", str(delay),
        "--profanity", profanity,
        "--key", os.environ.get("SPEECH_KEY", ""),
        "--region", os.environ.get("SPEECH_REGION", "")
    ]
    
    if srt:
        command.append("--srt")
    if real_time:
        command.append("--realTime")
    
    subprocess.run(command)

if __name__ == "__main__":
    run_captioning("sample.mp3", "output.txt")
