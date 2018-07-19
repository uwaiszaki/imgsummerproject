from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings

<<<<<<< HEAD




=======
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
# This code is triggered whenever a new user has been created and saved to the database

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
<<<<<<< HEAD
        Token.objects.create(user=instance)



=======
        Token.objects.create(user=instance)
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
