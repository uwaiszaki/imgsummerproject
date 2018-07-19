"""
WSGI config for imgproject project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
<<<<<<< HEAD
https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/
=======
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "imgproject.settings")

application = get_wsgi_application()
