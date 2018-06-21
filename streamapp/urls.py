from django.urls import path , include
from django.contrib.auth.views import login
from streamapp import views
urlpatterns = [
	#url(r'^login/$'  , login,{ 'template_name':'app1/login.html'}),
	#path('login/',views.log , name='log') ,
	path('users/registration/', views.CreateUser.as_view()),
	path('detail/<username>/', views.UserDetail.as_view()),
]

