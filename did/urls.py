from django.urls import path
from . import views

urlpatterns = [
    path('authentication/', views.authentication_page),
    path('register-did/', views.register_did),
]
