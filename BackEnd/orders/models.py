from django.db import models
from django.db.models.base import Model
from products.models import products
# from products.models import Category
from users.models import User


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
    product = models.ForeignKey(products, on_delete=models.CASCADE,null=True,blank=True)
    user = models.ForeignKey(User,
                                 on_delete=models.CASCADE,blank=True, null=True)
    quantity = models.IntegerField(default=1)
    price = models.IntegerField(blank=True, null=True)
    address = models.CharField(max_length=200,blank=True, null=True )
    phone = models.CharField(max_length=13,blank=True, null=True)
    date = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=13,choices=order_Status,default='P')


    rating = models.FloatField(null=True, blank=True)
    review = models.TextField(null=True, blank=True)

    

    def __str__(self) -> str:
        return self.product.name

    def save(self, *args, **kwargs):
        if self.product is not None:
            self.price = self.product.price
        super().save(*args, **kwargs)
