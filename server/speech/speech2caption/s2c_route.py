import os
from dotenv import load_dotenv

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), ".env")
load_dotenv(dotenv_path)

print(os.environ.get("SPEECH_KEY"))
print(os.environ.get("SPEECH_REGION"))
