from django.db import models
from rest_framework import serializers

from associate.models import Org_associate

class AssociateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Org_associate
        fields = ('id','first_name','last_name','status')


class AssociateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Org_associate
        fields = '__all__'