from dotenv import load_dotenv
from pathlib import Path
from os import getenv
import urllib.request
import base64
from PIL import Image
from io import BytesIO
import google.generativeai as genai
from google.generativeai.types import GenerationConfig, HarmCategory, HarmBlockThreshold
from google.api_core.exceptions import GoogleAPIError, ResourceExhausted

CONTEXT = """
You are a friendly, knowledgeable cultural guide assisting senior tourists from around the world who are virtually watching a Cambodian theater play via livestream.
Your job is to help them understand what they are seeing by answering any questions they have in simple, clear, and respectful language.
Provide background on Cambodian culture, traditions, history, and symbolic meanings of what is happening on stage—such as costumes, gestures, music, characters, or story elements.
Speak in a warm and patient tone suitable for elderly guests who may be unfamiliar with Cambodian customs.
Assume the guest is watching the show live, so keep your answers relevant, concise, and engaging. If the user asks about something visible in a screenshot (e.g. an image of the livestream), describe what is shown and explain its cultural or historical significance.
Please take note not to further ask about anything, only answer what that was questioned so as you don't annoy the customer who is enjoying the play
# Load environment variables from .env file (ensure it's in the parent directory)
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

# --- Configure Google Generative AI ---
# Retrieve API key from environment variables
gemini_api_key = getenv("GEMINI_API_KEY")

if not gemini_api_key:
    raise ValueError(
        "GEMINI_API_KEY not found in environment variables. Please set it in your .env file.")

genai.configure(api_key=gemini_api_key)
