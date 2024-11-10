from django.urls import path
from .views import *

urlpatterns = [
    path('products/',get_products,name='get_products'),
    path('products/add',add_product,name='add_product'),
    path('products/edit/<int:pk>',edit_product,name='edit_product'),
    path('products/details/<int:pk>',product_details,name='product_details'),
    path('reviews/<int:product>',get_reviews,name='get_reviews'),
    
]