from django.urls import path
from . import views

urlpatterns = [
    path('livestream_viewer/', views.livestream_viewer, name='livestream_viewer'),
    path('ask-ai/', views.ask_ai, name='ask_ai'),
]