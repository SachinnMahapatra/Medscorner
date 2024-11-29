from django.contrib import admin
from .models import products, review
# Register your models here.


class ProductsAdmin(admin.ModelAdmin):
    list_display = ['name','category','stock']
    # sortable_by = ['stock']
class ReviewAdmin(admin.ModelAdmin):
    list_display=['user','product','rating']

admin.site.register(products,ProductsAdmin)
admin.site.register(review,ReviewAdmin)