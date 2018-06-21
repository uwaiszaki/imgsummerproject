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
# Create your views here.


class CreateUser(generics.CreateAPIView):  # Provides only POST Method
    permission_classes = (permissions.AllowAny,)
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def get(self, request, username):
        user = get_user_model().objects.get(username=username)
        serializer = UserSerializer(user)
        return Response(serializer.data)