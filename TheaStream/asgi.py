import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
import livestream.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TheaStream.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            livestream.routing.websocket_urlpatterns
        )
    ),
})
