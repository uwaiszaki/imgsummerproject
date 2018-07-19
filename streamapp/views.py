from django.shortcuts import render
<<<<<<< HEAD
from .serializers import UserSerializer , TokenSerializer 
=======

# Create your views here.
"""
def log(request):
	if request.method == 'POST':
		form = logform(request.POST)
		
		if form.is_valid():
			username = form.cleaned_data['username']
			password = form.cleaned_data['password']
			user = authenticate(username = username , password = password )

		if user is not None:
			
			if user.is_active:
				login(request , user)
				if user.is_staff:
				#if 'next' in request.POST:
				#	return redirect(request.POST.get('next'))
				#request.POST.get('next')
				return HttpResponseRedirect('/app1/')
		else:
			return HttpResponse("Username Password Incorrect")

	else:
		form = logform()
	return render(request , 'app1/login.html' , { 'form':form}
"""

from .serializers import UserSerializer
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.models import User
<<<<<<< HEAD
from rest_framework.authtoken.models import Token

=======
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
# Create your views here.


class CreateUser(generics.CreateAPIView):  # Provides only POST Method
	permission_classes = (permissions.AllowAny,)
	queryset = get_user_model().objects.all()
	serializer_class = UserSerializer

<<<<<<< HEAD
	def perform_create(self ,serializer):
		validated_data = serializer.validated_data
		if validated_data['password'] == validated_data['confirm_password']:


			#
=======
	def perform_create(self ,validated_data):
		if validated_data['password'] == validated_data['confirm_password']:

			#if validated_data['username'].is_staff:
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
			userobj = User.objects.create(
			first_name = validated_data['first_name'] , 
			last_name = validated_data['last_name'] ,
			username = validated_data['username'] ,
<<<<<<< HEAD
			is_active = False , 
			 
				)
			userobj.set_password(validated_data['password'])
			

			
=======
			is_active = False 
				)
			userobj.set_password(validated_data['password'])
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2

			userobj.save()
			
		
			


<<<<<<< HEAD
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
=======
class UserDetail(generics.ListAPIView):
	
	permission_classes = ( permissions.IsAuthenticated ,)
	
	serializer_class = UserSerializer
	
	"""
	def get(self, request, username):
		user = get_user_model().objects.get(username=request.user)
		serializer = UserSerializer(user)
		return Response(serializer.data)

	
	def get_obj(self):
		user = self.request.user
		return User.objects.get(username = user)
	"""
	def get(self , request , **kwargs):
		userobj = User.objects.get(username=self.kwargs['user'])
		serializerobj =  UserSerializer(userobj)
		return Response(serializerobj.data)
		
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
