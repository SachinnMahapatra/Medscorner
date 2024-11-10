from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import products, review
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
# from rest_framework_simplejwt.tokens import RefreshToken




from rest_framework.generics import GenericAPIView, RetrieveAPIView
# Create your views here.


@api_view(['GET'])
def get_products(request):
    product = products.objects.all()
    serializer = productSerializer(product, many=True)
    
    return Response(serializer.data)


@api_view(['GET'])
def product_details(request,pk):
    try:
        product = products.objects.get(pk=pk)
    except products.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = productSerializer(product)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  




@api_view(['POST'])
# @permission_classes((IsAdminUser,))
def add_product(request):
    serializer = productSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET','PUT','DELETE'])
# @permission_classes((IsAdminUser,))
def edit_product(request,pk):
    try:
        product = products.objects.get(pk=pk)
    except products.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = productSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = productSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def get_reviews(request,product):
    product = review.objects.filter(product=product)
    serializer = reviewSerializer(product, many=True)
    
    return Response(serializer.data)