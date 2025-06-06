from django.contrib import admin
from .models import Order
# Register your models here.

class OrderAdmin(admin.ModelAdmin):
    
    list_display = ['product','quantity','status','date']
    sortable_by = ['status']
    
admin.site.register(Order,OrderAdmin)