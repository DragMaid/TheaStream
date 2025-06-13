# did_auth/views.py
from django.shortcuts import render
from django.http import JsonResponse
from .models import UserDID
from django.conf import settings
import jwt
import datetime


def authentication_page(request):
    return render(request, 'authentication.html')


def register_did(request):
    if request.method == 'POST':
        did = request.POST.get('did')
        public_key = request.POST.getlist(
            'public_key[]') or request.POST.getlist('public_key')

        if not did or not public_key:
            return JsonResponse({'error': 'Missing DID or public key'}, status=400)

        # Convert public key list of strings to bytes
        try:
            public_key_bytes = bytes(map(int, public_key))
        except Exception as e:
            return JsonResponse({'error': 'Invalid public key format'}, status=400)

        # Create user if not exists
        if not UserDID.objects.filter(did=did).exists():
            UserDID.objects.create(did=did, public_key=public_key_bytes)

        # Create JWT token
        payload = {
            'did': did,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }
        token = jwt.encode(payload, settings.JWT_SECRET,
                           algorithm=settings.JWT_ALGORITHM)

        # Send token via cookie
        response = JsonResponse({'status': 'success'})
        response.set_cookie('did_jwt', token, httponly=True,
                            samesite='Lax')  # Use Secure=True for HTTPS
        return response

    return JsonResponse({'error': 'Invalid request method'}, status=405)
