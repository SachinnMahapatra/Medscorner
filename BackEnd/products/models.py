from django.db import models
from PIL import Image
from users.models import User

# Create your models here.
class products(models.Model):
    category = models.CharField(null=True, max_length=100, blank=True)
    name = models.CharField(null=True, max_length=200, blank=True)
    # image = models.URLField(null=True, max_length=600 , blank=True)
    price = models.IntegerField(null=True, blank=True)
    manufacturer = models.TextField(null=True , blank=True)
    description = models.TextField(null=True , blank=True)
    stock = models.IntegerField(null=True , blank=True)
    compositions = models.TextField(null=True , blank=True)
    expiry_date = models.DateField(null=True , blank=True)
    uses = models.TextField(null=True , blank=True)
    side_effects = models.TextField(null=True , blank=True)
    quantity = models.CharField(max_length=200,null=True,blank=True)
    #added
    prescription_required = models.BooleanField(default=False)
    dosage = models.CharField(max_length=200, null=True, blank=True)  # e.g., 500mg, 10ml
    image = models.ImageField(upload_to='uploads/products/', null=True, blank=True)
    image2 = models.ImageField(upload_to='uploads/products/', null=True, blank=True)
    image3 = models.ImageField(upload_to='uploads/products/', null=True, blank=True)
    
    rating = models.FloatField(null=True, default=0, blank=True)
    
    # reviews = models.ForeignKey(rating,on_delete=models.CASCADE, null=True, blank=True)
    # reviews = models.ForeignKey(review, on_delete=models.CASCADE, null=True, blank=True)



    total_rating = models.IntegerField(null=True, default=0, blank=True)
    total_reviews = models.IntegerField(null=True, default=0, blank=True)


class review(models.Model):
    rating = models.IntegerField(null=True, blank=True)
    review = models.TextField(null=True , blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey(products, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)



