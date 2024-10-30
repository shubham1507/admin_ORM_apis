from django.db import models
from rest_framework import serializers

from product_category.models import Product_category

class Product_categoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_category
        fields = ('id','prod_category','is_active','created_on')


class Product_categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_category
        fields = '__all__'