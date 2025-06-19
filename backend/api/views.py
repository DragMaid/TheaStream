from django.http import FileResponse, HttpResponseForbidden, Http404
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import os


def serve_video(request, filename):
    path = os.path.join("media/videos", filename)

    if not os.path.exists(path):
        return HttpResponseForbidden("Video not found")

    origin = request.headers.get("Origin")
    allowed = getattr(settings, "CORS_ALLOWED_ORIGINS", [])

    if origin in allowed:
        response = FileResponse(open(path, "rb"), content_type="video/mp4")
        response["Access-Control-Allow-Origin"] = origin
        response["Access-Control-Allow-Headers"] = "Content-Type"
        response["Access-Control-Allow-Methods"] = "GET, OPTIONS"

    return response


