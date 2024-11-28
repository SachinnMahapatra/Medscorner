from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import User, Cart
from .serializer import *
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework_simplejwt.tokens import RefreshToken




from rest_framework.generics import GenericAPIView, RetrieveAPIView
# Create your views here.


@api_view(['GET'])
# @permission_classes(IsAdminUser)
def get_users(request):
    Users = User.objects.all()
    serializer = UserSerializer(Users, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes((AllowAny,))
def create_user(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token),
                          "access": str(token.access_token)}
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((AllowAny,))
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        serializer = UserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token),  
                          "access": str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def logout(request):
    try:
        refresh_token = request.data["refresh"]
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        token = RefreshToken(refresh_token)
        
        token.blacklist()

        return Response(status=status.HTTP_205_RESET_CONTENT)
    
    except Exception as e:
        return Response(status= status.HTTP_400_BAD_REQUEST)
        

#getting a user data

@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated,))
def user_details(request):
    try:
        user = request.user
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET','PUT','DELETE'])
@permission_classes((IsAuthenticated,))
def editCart(request):
    try:
        user = request.user.id
        # user = 1
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        cart = Cart.objects.filter(user=user)
        serializer = cartSerializer(cart, many=True)
        return Response(serializer.data)
    

    # elif request.method == 'POST':
    #     data = request.data.copy()
    #     data['user'] = user
    #     serializer = cartSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response({'error':'Failed to add'}, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'PUT':
        item = request.data.get('item')
        print(item,user)
        if not item:
            return Response({'error': 'Item not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        userCart = Cart.objects.filter(user=user, item=item).first()
        if not userCart:
            data = request.data.copy()
            data['user'] = user
            serializer = cartSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response({'error':'Failed to add'}, status=status.HTTP_400_BAD_REQUEST)

            # return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
          
        serializer = cartSerializer(userCart,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
   
    elif request.method == 'DELETE':
        
        # Get the item or cart entry to delete
        item = request.data.get('item')  # Assuming 'item' is passed in the request
        if not item:
            return Response({'error': 'Item not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Find the cart entry
        cart_entry = Cart.objects.filter(user=user, item=item).first()
        if not cart_entry:
            return Response({'error': 'Cart item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Delete the cart entry
        cart_entry.delete()
        return Response({'message': 'Cart item deleted'}, status=status.HTTP_204_NO_CONTENT)

    

















# class UserLogoutAPIView(GenericAPIView):
#     permission_classes = (IsAuthenticated,)
    
#     def post(self, request, *args, **kwargs):
#         try:
#             refresh_token = request.data["refresh"]
#             token = RefreshToken(refresh_token)
#             token.blacklist()
#             return Response(status=status.HTTP_205_RESET_CONTENT)
#         except Exception as e:
#             return Response(status= status.HTTP_400_BAD_REQUEST)

# class UserInfo(RetrieveAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class = UserSerializer
    
#     def get_object(self):
#         return self.request.user
    