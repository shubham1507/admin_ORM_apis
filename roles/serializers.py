from django.db import models
from django.db.models import fields
from rest_framework import serializers

from .models import Role

class RoleListSerilaizer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id','role','status')


class RoleSeriliazer(serializers.ModelSerializer):

    class Meta:
        models = Role
        fields = '__all__'
    