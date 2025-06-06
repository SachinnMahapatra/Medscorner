from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"




class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id","username", "email", "password1", "password2")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match!")

        password = attrs.get("password1", "")
        if len(password) < 8:
            raise serializers.ValidationError(
                "Passwords must be at least 8 characters!")

        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return User.objects.create_user(password=password, **validated_data)




class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            print("Login success!")
            return user
        raise serializers.ValidationError("Incorrect Credentials!")    
    
class cartSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source='item.image',read_only=True)
    price = serializers.IntegerField(source='item.price', read_only=True)
    name = serializers.CharField(source='item.name', read_only=True)
    prescription_required = serializers.BooleanField(source='item.prescription_required',read_only=True)
    class Meta:
        model = Cart
        fields = ['id','item','quantity','prescription_required','user','price','image','name']

class otpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Otp
        fields = "__all__"