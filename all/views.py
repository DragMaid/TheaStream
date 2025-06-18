from django.shortcuts import render

# Create your views here.
def all(request):
    return render(request, "index.html", {
        "message": "Welcome to the All page!"
    })