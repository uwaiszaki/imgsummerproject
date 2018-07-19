from django.contrib.auth.models import User
from rest_framework import serializers
<<<<<<< HEAD
from rest_framework.authtoken.models import Token
=======
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2



class UserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(max_length=100 , write_only = True)
	confirm_password = serializers.CharField(max_length=100 , write_only = True )
<<<<<<< HEAD
	
=======

>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
	

	class Meta:
		model = User
		fields = (
			'first_name' , 'last_name' , 'username' , 'password' , 'confirm_password',

			)

<<<<<<< HEAD
class TokenSerializer(serializers.ModelSerializer):
	user = serializers.CharField(max_length=100)

	class Meta:
		model = Token
		fields = (
				'key' , 'user' , 
			)
=======
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
