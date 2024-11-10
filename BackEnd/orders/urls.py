from django.urls import path
from .views import *

urlpatterns = [
    path('order/',get_orders,name='get_order'),
    path('order/add',place_order,name='add_order'),
    path('order/edit/<int:pk>',edit_order,name='edit_order'),
    path('order/details/<int:pk>',order_details,name='order_details'),
    path('order/rating/<int:pk>',rating,name='rating_review'),
    
]