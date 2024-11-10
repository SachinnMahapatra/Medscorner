from rest_framework import serializers
from .models import Order

class orderSerializer(serializers.ModelSerializer):
    class Meta :
        model = Order
        fields = '__all__'

class ratingserializer(serializers.ModelSerializer):
    class Meta :
        model = Order
        fields = ['product','user','rating','review']