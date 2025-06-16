from django.db import models
# from products.models import Category
from users.models import User
from django.utils import timezone
from django.db.models import JSONField
from PIL import Image

# Create your models here.



class Appointment(models.Model):
    
    date = models.DateTimeField(default=timezone.now)
    
    user = models.ForeignKey(User,
                                 on_delete=models.CASCADE,blank=True, null=True)
    patientName = models.CharField(blank=True,null=True,max_length=100)
    age = models.IntegerField(default=1)
    gender = models.CharField(blank=True, null=True,max_length=20)
    slot = models.CharField(blank=True, null=True ,max_length=100)
    contactNumber = models.CharField(max_length=13,blank=True, null=True)
    # date = models.DateTimeField(auto_now=True)
    email = models.CharField(blank=True, null=True,max_length=100)
   

    

    def __str__(self) -> str:
        return self.patientName

    
class Doctors(models.Model):
    
    
    doctorName = models.CharField(blank=True,null=True,max_length=100)
    specialization = models.CharField(blank=True, null=True,max_length=20)
    availableDates = JSONField()
    fees = models.IntegerField(default=100)
    photo = models.ImageField(upload_to="uploads/doctorsPhoto/",null=True , blank=True)
    experience = models.CharField(blank=True, null=True ,max_length=100)
    rating = models.FloatField(blank=True, null=True)

    def __str__(self) -> str:
        return self.doctorName
