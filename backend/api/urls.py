from django.urls import include, path

urlpatterns = [
    path("chatbot/", include("chatbot.urls")),
    path("transcribe/", include("transcribe.urls")),
]