# Generated by Django 5.1.2 on 2024-12-01 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_products_cat'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='cat',
        ),
        migrations.AlterField(
            model_name='products',
            name='category',
            field=models.CharField(choices=[('General medicine', 'General medicine'), ('Hair care products', 'Hair care products'), ('Baby care products', 'Baby care products'), ('Skin Care Products', 'Skin Care Products')], default='General medicine', max_length=50),
        ),
    ]
