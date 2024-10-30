from django.db import models
from rest_framework import serializers

from client.models import Client

class ClientListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('id','client_name')


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'