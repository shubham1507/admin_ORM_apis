from django.db import models
from rest_framework import serializers

from product.models import Product

class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','product')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'