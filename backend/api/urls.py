from django.urls import include, path
from .views import serve_video, serve_voice_model

urlpatterns = [
    path("chatbot/", include("chatbot.urls")),
    path("transcribe/", include("transcribe.urls")),
    path("video/<str:filename>/", serve_video),
    path("voice/model/<str:filename>/", serve_voice_model),
]
