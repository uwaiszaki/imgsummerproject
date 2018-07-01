from django.shortcuts import render

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
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import permissions
from django.contrib.auth.models import User
# Create your views here.


class CreateUser(generics.CreateAPIView):  # Provides only POST Method
	permission_classes = (permissions.AllowAny,)
	queryset = get_user_model().objects.all()
	serializer_class = UserSerializer

	def perform_create(self ,validated_data):
		if validated_data['password'] == validated_data['confirm_password']:

			#if validated_data['username'].is_staff:
			userobj = User.objects.create(
			first_name = validated_data['first_name'] , 
			last_name = validated_data['last_name'] ,
			username = validated_data['username'] ,
			is_active = False 
				)
			userobj.set_password(validated_data['password'])

			userobj.save()
			
		
			


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
		