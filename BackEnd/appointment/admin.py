from django.contrib import admin

# Register your models here.
from .models import *
# Register your models here.

class PatientAdmin(admin.ModelAdmin):
    list_display = ['patientName','slot']
    
admin.site.register(Appointment,PatientAdmin)


class DoctorAdmin(admin.ModelAdmin):
    list_display = ['doctorName']
    
admin.site.register(Doctors,DoctorAdmin)