from rest_framework import serializers
from .models import products, review

class productSerializer(serializers.ModelSerializer):
    class Meta :
        model = products
        fields = '__all__'

# class editStockSerializer(serializers.ModelSerializer):
#     class Meta :
#         model = products
#         fields = ('stock') 


class reviewSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = review
        fields = ['id', 'rating', 'review', 'created_at', 'product', 'username']
