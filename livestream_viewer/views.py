import asyncio
import os
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage

from utils.chat_bot import ChatBot

ai_bot = ChatBot()

# Create your views here.


def livestream_viewer(request):
    return render(request, "index.html", {
        "video_url": "/media/videos/test1.mp4"
    })


@csrf_exempt
def ask_ai(request):
    if request.method == "POST":
        question = request.POST.get("question")
        screenshot_file = request.FILES.get("screenshot")
        image_path = None

        # Ensure cache folder exists
        cache_dir = os.path.join(settings.MEDIA_ROOT, "cache")
        os.makedirs(cache_dir, exist_ok=True)

        if screenshot_file:
            fs = FileSystemStorage(location=cache_dir)
            filename = fs.save("frame.jpg", screenshot_file)
            image_path = os.path.join(cache_dir, filename)

        async def call_ai():
            try:
                response = await ai_bot.ask_api(question=question, image_path=image_path)
                print("AI Response:", response)
                print("Question:", question)
                print("Image path:", image_path)
                return response
            finally:
                # Clean up the cached image
                if image_path and os.path.exists(image_path):
                    os.remove(image_path)

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        ai_response = loop.run_until_complete(call_ai())
        loop.close()

        return JsonResponse({"response": ai_response})
