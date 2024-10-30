from django.db import models
from rest_framework import serializers

from services.models import Services

class ServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = ('id','service_name','is_active','created_on')


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Services
        fields = '__all__'