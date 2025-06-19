import sys
import io
from django.utils.deprecation import MiddlewareMixin


class PrintCaptureMiddleware(MiddlewareMixin):
    def process_request(self, request):
        # Redirect stdout to capture print statements
        request._stdout = sys.stdout
        sys.stdout = request._stdout_buffer = io.StringIO()

    def process_response(self, request, response):
        # Restore stdout
        if hasattr(request, "_stdout"):
            sys.stdout = request._stdout
        if hasattr(request, "_stdout_buffer"):
            printed = request._stdout_buffer.getvalue()
            print(printed)  # Actually print to the terminal again

            # Optionally, attach to response for debug (remove in production)
            if request.META.get("DEBUG_PRINT"):
                response["X-Debug-Print"] = printed[:500]  # limit size
                if response.get("Content-Type", "").startswith("text/html"):
                    response.content += f"<pre style='color:#ccc;background:#111;padding:1em;'>DEBUG PRINT:\n{
                        printed}</pre>".encode()

        return response
