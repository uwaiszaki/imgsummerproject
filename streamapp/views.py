from django.shortcuts import render
from .serializers import UserSerializer , TokenSerializer 
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

# Create your views here.


class CreateUser(generics.CreateAPIView):  # Provides only POST Method
	permission_classes = (permissions.AllowAny,)
	queryset = get_user_model().objects.all()
	serializer_class = UserSerializer

	def perform_create(self ,serializer):
		validated_data = serializer.validated_data
		if validated_data['password'] == validated_data['confirm_password']:


			#
			userobj = User.objects.create(
			first_name = validated_data['first_name'] , 
			last_name = validated_data['last_name'] ,
			username = validated_data['username'] ,
			is_active = False , 
			 
				)
			userobj.set_password(validated_data['password'])
			

			

			userobj.save()
			
		
			


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
	lookup_field = 'username'
	permission_classes = ( permissions.AllowAny ,)
	queryset = User.objects.all()
	serializer_class = UserSerializer
	
		
class Details(generics.ListAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	#permission_classes = (permissions.Is_Admin  , )
		


class GetUser(generics.RetrieveUpdateDestroyAPIView):
	lookup_field = 'key'
	serializer_class = TokenSerializer
	queryset = Token.objects.all()