from dotenv import load_dotenv
from pathlib import Path
from os import getenv
import urllib.request
from PIL import Image
from io import BytesIO
import asyncio
import google.generativeai as genai

# Context for the chatbot

# Load .env from parent directory
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

CONTEXT = """
You are a friendly, knowledgeable cultural guide assisting senior tourists from around the world who are virtually watching a Cambodian theater play via livestream.
Your job is to help them understand what they are seeing by answering any questions they have in simple, clear, and respectful language.
Provide background on Cambodian culture, traditions, history, and symbolic meanings of what is happening on stage—such as costumes, gestures, music, characters, or story elements.
Speak in a warm and patient tone suitable for elderly guests who may be unfamiliar with Cambodian customs.
Assume the guest is watching the show live, so keep your answers relevant, concise, and engaging.
If the user asks about something visible in a screenshot (e.g. an image of the livestream), describe what is shown and explain its cultural or historical significance.
Please take note not to further ask about anything, only answer what that was questioned so as you don't annoy the customer who is enjoying the play
"""

# Gemini API setup
gemini_api_key = getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

DEFAULT_MODEL = "gemini-1.5-flash"
DEFAULT_SAFETY_SETTINGS = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"}
]
DEFAULT_GENERATION_CONFIG = {
    "max_output_tokens": 300
}


class ChatBot:
    def __init__(self, model_name=DEFAULT_MODEL,
                 safety_settings=DEFAULT_SAFETY_SETTINGS,
                 generation_config=DEFAULT_GENERATION_CONFIG):
        self._model_name = model_name
        self._safety_settings = safety_settings
        self._generation_config = generation_config

        genai.configure(api_key=gemini_api_key)
        self.client = genai.GenerativeModel(
            model_name=self._model_name,
            safety_settings=self._safety_settings,
            generation_config=self._generation_config
        )
        self.chat_session = self.client.start_chat(history=[])

    async def test_authentication(self):
        try:
            _ = await asyncio.to_thread(
                self.client.generate_content,
                "Hello"
            )
            print("✅ API Key loaded and connection successful.")
        except genai.types.generation_types.ResourceExhaustedError:
            print("❌ Quota exhausted.")
            exit()
        except genai.types.generation_types.GoogleAPIError as e:
            print(f"API Error: {e}")
            if "authentication" in str(e).lower():
                print("Please check your GEMINI_API_KEY.")
            exit()
        except Exception as e:
            print(f"Unexpected error: {e}")
            exit()

    async def test_link(self, url):
        try:
            def _blocking_urlopen():
                req = urllib.request.Request(
                    url, headers={'User-Agent': 'Mozilla/5.0'})
                return urllib.request.urlopen(req, timeout=10)

            response = await asyncio.to_thread(_blocking_urlopen)
            return response.getcode() == 200
        except urllib.error.URLError as e:
            print(f"URL error: {e.reason}")
            return False
        except Exception as e:
            print(f"Unexpected URL test error: {e}")
            return False

    async def _load_and_optimize_image(self, image_path):
        try:
            def _blocking_image_load():
                with open(image_path, 'rb') as img_file:
                    img_data = img_file.read()

                img = Image.open(BytesIO(img_data))
                if img.mode != 'RGB':
                    img = img.convert('RGB')

                MAX_EFFICIENT_SIDE = 768
                if max(img.size) > MAX_EFFICIENT_SIDE:
                    img.thumbnail(
                        (MAX_EFFICIENT_SIDE, MAX_EFFICIENT_SIDE),
                        Image.Resampling.LANCZOS
                    )
                return img

            return await asyncio.to_thread(_blocking_image_load)

        except FileNotFoundError:
            print(f"Image not found: {image_path}")
            return None
        except Exception as e:
            print(f"Image loading error: {e}")
            return None

    async def ask_api(self, question=None, image_path=None):
        try:
            if not question and not image_path:
                return "Please provide a question or an image path."

            if image_path:
                return await self.ask_image(question, image_path)

            return await self.ask_text(question)

        except genai.types.generation_types.ResourceExhaustedError:
            return "Rate limit or quota exceeded."
        except genai.types.generation_types.GoogleAPIError as e:
            return f"API error: {e}"
        except Exception as e:
            return f"Unexpected error: {e}"

    async def ask_text(self, question):
        if not question:
            return "Please ask a question."

        response = await asyncio.to_thread(self.chat_session.send_message, question)
        return response.text

    async def ask_image(self, question, image_path):
        image = await self._load_and_optimize_image(image_path)
        if not image:
            return "Failed to load or optimize image."

        response = await asyncio.to_thread(
            self.chat_session.send_message,
            [image, question]
        )
        return response.text


# --- Test code ---
async def test():
    import os
    root_dir = Path(__file__).resolve().parent.parent
    image_path = os.path.join(root_dir, "static", "test1.jpg")

    if not Path(image_path).exists():
        print("Missing test image.")
        return

    bot = ChatBot()
    await bot.test_authentication()

    print("\n--- Text Test ---")
    print(await bot.ask_api("Who was the first president of Cambodia?"))

    print("\n--- Image Test ---")
    print(await bot.ask_api(
        "Can you describe the overall setting and mood in this image?",
        image_path
    ))

    print("\n--- Follow-up Test ---")
    print(await bot.ask_api("What role might the color purple play in the symbolism of the scene?"))

    print("\n--- Empty Question ---")
    print(await bot.ask_api(question=""))

    print("\n--- Empty Image Path ---")
    print(await bot.ask_api(question="Test question", image_path=""))

if __name__ == "__main__":
    asyncio.run(test())
