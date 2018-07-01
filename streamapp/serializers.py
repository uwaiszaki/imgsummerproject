from django.contrib.auth.models import User
from rest_framework import serializers



class UserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(max_length=100 , write_only = True)
	confirm_password = serializers.CharField(max_length=100 , write_only = True )
	
	

	class Meta:
		model = User
		fields = (
			'first_name' , 'last_name' , 'username' , 'password' , 'confirm_password',

			)

