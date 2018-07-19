from django.urls import path , include
from django.conf.urls import url
from django.contrib.auth.views import login
<<<<<<< HEAD
from streamapp.views import CreateUser , UserDetail , Details , GetUser
=======
from streamapp.views import CreateUser , UserDetail
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
from rest_framework.authtoken import views
urlpatterns = [
	#url(r'^login/$'  , login,{ 'template_name':'app1/login.html'}),
	#path('login/',views.log , name='log') ,
	url(r'^signup/$', CreateUser.as_view()),
<<<<<<< HEAD
	url(r'^details/$', Details.as_view()),
	url(r'^detail/(?P<username>([a-zA-Z])([a-zA-Z0-9]*)+)$', UserDetail.as_view()),
	url(r'^getuser/(?P<key>([a-zA-Z0-9]+))$' ,GetUser.as_view()) , 
	url(r'^login/$', views.obtain_auth_token) ,

=======
	url(r'^detail/(?P<user>\w+)$', UserDetail.as_view()),
	url(r'^login/$', views.obtain_auth_token) ,
>>>>>>> 4408ea4e5b30da67c2a693ef13e35b4d0e64c0e2
]

