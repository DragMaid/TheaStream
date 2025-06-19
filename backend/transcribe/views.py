from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .transcriber import Transcriber
import tempfile


transcriber = Transcriber()


@csrf_exempt
@require_POST
def transcribe_audio(request):
    audio_file = request.FILES.get("audio")
    if not audio_file:
        return JsonResponse({"error": "No audio file provided"}, status=400)

    with tempfile.NamedTemporaryFile(delete=True, suffix=".webm") as temp_audio:
        for chunk in audio_file.chunks():
            temp_audio.write(chunk)
        temp_audio.flush()

        try:
            result_text = transcriber.transcribe(temp_audio.name)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"text": result_text})
