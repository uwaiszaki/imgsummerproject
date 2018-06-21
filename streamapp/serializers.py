from django.contrib.auth.models import User
from rest_framework import serializers



class UserSerializer(serializers.ModelSerializer):
	password = serializers.CharField(max_length=100 , write_only = True)
	confirm_password = serializers.CharField(max_length=100 , write_only = True )

	def create(self , validated_data):
		if validated_data['password'] == validated_data['confirm_password'] :
			userobj = User.objects.create(
				first_name = validated_data['first_name'] , 
				last_name = validated_data['last_name'] ,
				username = validated_data['username'] ,
				is_active = False 
				)
			userobj.set_password(validated_data['password'])
			userobj.save()
			return userobj
		else:
			raise serializers.ValidationError("Passwords don't match")


	class Meta:
		model = User
		fields = (
			'first_name' , 'last_name' , 'username' , 'password' , 'confirm_password'

			)

