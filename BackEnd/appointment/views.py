from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import *
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

from users.models import User
# Create your views here.
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def bookAppointment(request):
    try:
        user=request.user.id
        # user=1
    except User.DoesNotExist:
        return ResourceWarning(status=status.HTTP_401_UNAUTHORIZED)
    data = request.data.copy()
    data['user'] = user
    serializer = appointmentSerializer(data=data)
    
    if serializer.is_valid():
        
        # Save the order
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def doctors(request):
    doc = Doctors.objects.all()
    serializer = doctorSerializer(doc, many=True)
    
    return Response(serializer.data)