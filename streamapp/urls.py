from django.urls import path , include
from django.conf.urls import url
from django.contrib.auth.views import login
from streamapp.views import CreateUser , UserDetail
from rest_framework.authtoken import views
urlpatterns = [
	#url(r'^login/$'  , login,{ 'template_name':'app1/login.html'}),
	#path('login/',views.log , name='log') ,
	url(r'^signup/$', CreateUser.as_view()),
	url(r'^detail/(?P<user>\w+)$', UserDetail.as_view()),
	url(r'^login/$', views.obtain_auth_token) ,
]

