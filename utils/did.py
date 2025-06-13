import uuid
import jwt
from django.conf import settings

def generate_did():
    method = "example"
    identifier = str(uuid.uuid4())
    return f"did:{method}:{identifier}"

def generate_did_jwt(did):
    payload = {
        "did": did,
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)
