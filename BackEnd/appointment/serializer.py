from rest_framework import serializers
from .models import *

class appointmentSerializer(serializers.ModelSerializer):
    class Meta :
        model = Appointment
        fields = '__all__'

class doctorSerializer(serializers.ModelSerializer):
    class Meta :
        model = Doctors
        fields = '__all__'

# class ratingserializer(serializers.ModelSerializer):
#     class Meta :
#         model = Order
#         fields = ['product','user','rating','review']