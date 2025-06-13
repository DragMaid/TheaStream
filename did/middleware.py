# middleware.py
from django.shortcuts import redirect
from django.conf import settings
import jwt
from .models import UserDID

class DIDAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.protected_paths = ['/livestream_viewer']

    def __call__(self, request):
        if any(request.path.startswith(p) for p in self.protected_paths):
            token = request.COOKIES.get('did_jwt')
            if not token:
                return redirect('/authentication')

            try:
                payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
                did = payload.get('did')
                if not did or not UserDID.objects.filter(did=did).exists():
                    return redirect('/authentication')
            except jwt.PyJWTError:
                return redirect('/authentication')

        return self.get_response(request)
