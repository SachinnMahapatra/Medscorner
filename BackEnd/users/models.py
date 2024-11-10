from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(null=True, unique=True, blank=True)
    username = models.CharField(null=True, max_length=100, unique=True,default="", validators=[UnicodeUsernameValidator], blank=True)
    password = models.CharField(null=True, max_length=100, blank=True)
    name = models.CharField(null=True, max_length=200, blank=True)
    age = models.IntegerField(null=True, default=18, blank=True)
    last_order = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    number = models.CharField(null=True, max_length=13, blank=True)
    

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']





