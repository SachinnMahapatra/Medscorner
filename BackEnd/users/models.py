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
    address = models.TextField(null=True, blank=True)
    number = models.CharField(null=True, max_length=13, blank=True)
    # cart = models.TextField(null=True, blank=True)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']


class Cart(models.Model):
    # from products.models import products
    
    item=models.ForeignKey("products.products",on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return ("user: "+self.user.username )

