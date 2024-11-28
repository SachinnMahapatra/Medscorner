from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializers import *
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from products.serializers import *
from products.models import products, review
from users.models import User
# from rest_framework_simplejwt.tokens import RefreshToken




from rest_framework.generics import GenericAPIView, RetrieveAPIView
# Create your views here.


@api_view(['GET'])
def get_orders(request):
    order = Order.objects.all()
    serializer = orderSerializer(order, many=True)
    return Response(serializer.data)



@api_view(['POST'])
# @permission_classes((IsAuthenticated,IsAdminUser))
def place_order(request):
    # Deserialize the incoming order data
    serializer = orderSerializer(data=request.data)

    if serializer.is_valid():
        product_id = serializer.validated_data['product'].id
        product_instance = products.objects.get(pk=product_id)

        # Check if there is enough stock
        if product_instance.stock < serializer.validated_data['quantity']:
            return Response({"error": "Insufficient stock"}, status=status.HTTP_400_BAD_REQUEST)

        # Update the product's stock and save
        product_instance.stock -= serializer.validated_data['quantity']
        product_instance.save()

        # Save the order
        serializer.save()
        #adding the id to the user object
        user_id = serializer.data['user']
        user_instance = User.objects.get(pk=user_id)
        if not user_instance.last_order:
            user_instance.last_order=str(serializer.data['id'])+','
        else:
            user_instance.last_order+=str(serializer.data['id'])+','
        user_instance.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
def order_details(request,pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = orderSerializer(order)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  







@api_view(['GET','PUT','DELETE'])
# @permission_classes((IsAdminUser,IsAuthenticated))
def edit_order(request,pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = orderSerializer(order)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = orderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# @api_view(['GET','PUT','DELETE'])
# # @permission_classes((IsAuthenticated,))
# def rating(request,pk):
#     try:
#         order = Order.objects.get(pk=pk)
#     except Order.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)
    
#     if request.method == 'GET':
#         serializer = ratingserializer(order)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = ratingserializer(order, data=request.data)
#         if serializer.is_valid():
#             product_id = order.product.id
#             product_instance = products.objects.get(pk=product_id)
#             if product_instance.total_rating==0:
#                 product_instance.rating=serializer.validated_data['rating']
#                 product_instance.total_rating=1
#             else:
#                 product_instance.rating=(((product_instance.rating*product_instance.total_rating)+serializer.validated_data['rating'])/(product_instance.total_rating+1))
#                 product_instance.total_rating+=1

#             product_instance.save()
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET','PUT','DELETE'])
# @permission_classes((IsAuthenticated,))
def rating(request,pk):
    try:
        order = Order.objects.get(pk=pk)
    except Order.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ratingserializer(order)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ratingserializer(order, data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            review_data = validated_data.get('review')
            rating_data = validated_data.get('rating')
            product_instance = products.objects.get(pk=order.product.id)
            user_id = validated_data.get('user').id
            product_id = validated_data.get('product').id

            # Ensure user and product match the order
            if order.user.id == user_id and order.product.id == product_id:
                # Check if a review already exists
                existing_review = review.objects.filter( user=user_id, product=product_id ).first()

                if existing_review:
                    # Edit the existing review

                    # Update product rating based on the updated review
                    total_reviews = product_instance.total_rating
                    
                    product_instance.rating = (
                        (product_instance.rating * total_reviews - existing_review.rating + rating_data) / total_reviews)
                    
                    existing_review.rating = rating_data
                    existing_review.review = review_data
                    existing_review.save()
                else:
                    # Create a new review
                    review.objects.create(**validated_data)
                    if product_instance.total_rating == 0:
                        product_instance.rating = rating_data
                        product_instance.total_rating = 1
                    else:
                        product_instance.rating = (
                            (product_instance.rating * product_instance.total_rating + rating_data)/(product_instance.total_rating + 1)
                        )
                        product_instance.total_rating += 1

                product_instance.save()
            else:
                return Response(
                    {"error": "Invalid user or product association with order."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Save the serializer and return response
            serializer.save()
            return Response(serializer.data)

    # Handle invalid serializer case
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
    
    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    #try
    # elif request.method == 'POST':
    #     serializer = ratingserializer(order, data=request.data)
    #     if serializer.is_valid():
    #         try: 
    #             data = serializer.validated_data['review']
    #             review.objects.create(**serializer.validated_data)
    #         except KeyError:
    #             print("Key 'review' not found.")

    #         try: 
    #             data = serializer.validated_data['rating']
    #             product_id = order.product.id
    #             product_instance = products.objects.get(pk=product_id)
    #             if product_instance.total_rating==0:
    #                 product_instance.rating=data
    #                 product_instance.total_rating=1
    #             else:
    #                 product_instance.rating=(((product_instance.rating*product_instance.total_rating)+data)/(product_instance.total_rating+1))
    #                 product_instance.total_rating+=1
    #         except KeyError:
    #             print("key rating is not found. ")
    #         product_instance.save()
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
