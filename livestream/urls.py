from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('livestream/', views.livestream_view),
    path('watch/', views.watch_view),
]

