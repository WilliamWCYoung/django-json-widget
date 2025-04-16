import secrets
from django.conf import settings

class CSPMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Generate a nonce for this request
        nonce = secrets.token_urlsafe(16)
        # Store the nonce in the request object so it's available in templates
        request.csp_nonce = nonce

        # Set CSP headers
        response = self.get_response(request)
        
        # Build CSP directives
        csp_directives = {
            'default-src': ["'self'"],
            'script-src': ["'self'"],
            'style-src': ["'self'", f"'nonce-{nonce}'"],
            'img-src': ["'self'", "data:"],
        }

        # Convert directives to CSP header string
        csp_string = '; '.join(
            f"{key} {' '.join(values)}"
            for key, values in csp_directives.items()
        )

        # Set the CSP header
        response['Content-Security-Policy'] = csp_string

        return response 