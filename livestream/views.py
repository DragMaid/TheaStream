from django.shortcuts import render


def livestream_view(request):
    return render(request, "livestream.html")


def watch_view(request):
    return render(request, "watch.html")
