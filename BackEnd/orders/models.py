from django.db import models
from django.db.models.base import Model
from products.models import products
# from products.models import Category
from users.models import User
from PIL import Image
from django.utils import timezone


# Create your models here.



class Order(models.Model):
    PADDING = 'P'
    OUT_FOR_DELIVERY = 'OFD'
    DELIVERED = 'D'
    order_Status = [
        (PADDING, 'Padding'),
        (OUT_FOR_DELIVERY, 'Out For Delivery'),
        (DELIVERED, 'Delivered'),
    ]
    date = models.DateTimeField(default=timezone.now)
    product = models.ForeignKey(products, on_delete=models.CASCADE,null=True,blank=True)
    user = models.ForeignKey(User,
                                 on_delete=models.CASCADE,blank=True, null=True)
    name = models.CharField(blank=True,null=True,max_length=100)
    quantity = models.IntegerField(default=1)
    price = models.IntegerField(blank=True, null=True)
    address = models.TextField(blank=True, null=True )
    phone = models.CharField(max_length=13,blank=True, null=True)
    # date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=13,choices=order_Status,default='P')
    prescription = models.ImageField(upload_to="uploads/prescriptions/",null=True , blank=True)


    rating = models.FloatField(null=True, blank=True)
    review = models.TextField(null=True, blank=True)

    

    def __str__(self) -> str:
        return self.product.name

    
