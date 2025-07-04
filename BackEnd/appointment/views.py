from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Appointment, Doctors # Import Doctors model
from .serializer import *
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from django.core.mail import send_mail
from django.template.loader import render_to_string

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
        # Get doctor information directly from request data
        doctor_name = request.data.get('doctorName', 'Not specified')
        doctor_specialization = request.data.get('specialization', 'Not specified')
        # email variables
        subject="Appointment Confirmation - MedsCorner"
        
        # Load HTML email template
        context = {
            'patient_name': serializer.validated_data['patientName'],
            'appointment_date': serializer.validated_data['slot'].split(' - ')[0], # Extract date from slot
            'appointment_time': serializer.validated_data['slot'].split(' - ')[1], # Extract time from slot
            'doctor_name': doctor_name,
            'doctor_specialization': doctor_specialization,
            'website_link': 'http://localhost:5173/appointments' # Replace with your actual website link
        }
        html_message = render_to_string('appointment/appointment_confirmation_email.html', context)

        sender = "apnasourav08@gmail.com"
        receiver = [serializer.validated_data["email"]]
             
        # send email
        send_mail(
                subject,
                '', # Empty message as we are sending HTML content
                sender,
                receiver,
                fail_silently=True,
                html_message=html_message,
            )
            

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def doctors(request):
    doc = Doctors.objects.all()
    serializer = doctorSerializer(doc, many=True)
    
    return Response(serializer.data)

@api_view(['POST'])
def adddoctors(request):
   
    data = request.data.copy()
    
    serializer = doctorSerializer(data=data)
    
    if serializer.is_valid():
            

        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
