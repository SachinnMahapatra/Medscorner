from django.urls import path
from .views import *

urlpatterns = [
    path('users/',get_users,name='get_users'),
    path('users/create',create_user,name='create_user'),
    path('users/login',login,name='get_user'),
    path('users/logout',logout,name='UserInfo'),
    path('users/details',user_details,name='get_user'),
    path('cart/',editCart,name='edit_cart'),
]