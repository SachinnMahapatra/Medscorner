from django.contrib import admin
from .models import User,Cart,Otp
# Register your models here.

class CartAdmin(admin.ModelAdmin):
    list_display=['user','item','quantity']

admin.site.register(User)
admin.site.register(Cart,CartAdmin)
admin.site.register(Otp)