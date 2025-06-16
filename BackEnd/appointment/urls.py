from django.urls import path
from .views import *

urlpatterns = [
    path('appointment/',bookAppointment,name='bookAppointment'),
    path('doctors/',doctors,name='doctorsDetails'),
    path('addDoctors/',adddoctors,name='doctorsDetails'),
   
    
]