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
"""

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

DEFAULT_MODEL = "gemini-1.5-flash"


class ChatBot:
    def __init__(self, model_name=DEFAULT_MODEL):
        self._model_name = model_name
        # Configuration for AI model
        self.model = genai.GenerativeModel(
            model_name=self._model_name,
            generation_config=GenerationConfig(max_output_tokens=300),
            safety_settings=[
                {"category": HarmCategory.HARM_CATEGORY_HARASSMENT,
                    "threshold": HarmBlockThreshold.BLOCK_NONE},
                {"category": HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    "threshold": HarmBlockThreshold.BLOCK_NONE},
            ]
        )

        # Initialize the chat session. The SDK manages history automatically.
        self.chat_session = self.model.start_chat(history=[])
        self.test_authentication()

    def test_authentication(self):
        """Test if the API key is properly loaded and quota not exceeded."""
        try:
            _ = self.model.generate_content(
                "hello", generation_config={"max_output_tokens": 5})
            print("API Key loaded and connection successful.")
        except ResourceExhausted:
            print(
                "Error: Quota exceeded or billing issue.")
            exit()
        except GoogleAPIError as e:
            print(f"Error during API key test: {e}")
            if "authentication" in str(e).lower():
                print("Please check your GEMINI_API_KEY in the .env file.")
            print("Please ensure your API key is correct and the model is accessible.")
            exit()
        except Exception as e:
            print(f"An unexpected error occurred during API key test: {e}")
            exit()

    def test_link(self, url):
        """Ping the link and return response state."""
        try:
            request = urllib.request.Request(
                url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(request, timeout=10) as response:
                return response.getcode() == 200
        except urllib.error.URLError as e:
            print(f"Error accessing URL {url}: {e.reason}")
            return False
        except Exception as e:
            print(
                f"An unexpected error occurred while testing link {url}: {e}")
            return False

