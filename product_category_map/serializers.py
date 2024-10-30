from django.db import models
from rest_framework import serializers

from product_category_map.models import Product_cat_Map

class Product_cat_MapListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_cat_Map
        fields = ('product_cat_map_id','product_id','prod_cat_id','is_active','created_on')


class Product_cat_MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_cat_Map
        fields = '__all__'