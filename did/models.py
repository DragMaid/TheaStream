from django.db import models

class UserDID(models.Model):
    did = models.CharField(max_length=255, unique=True)
    public_key = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)
