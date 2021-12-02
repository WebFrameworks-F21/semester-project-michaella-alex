from rest_framework import routers, serializers, viewsets
from .models import *
from rest_polymorphic.serializers import PolymorphicSerializer


class RackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rack
        fields = ['name', 'size', 'user', 'public']



class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        exclude = ()

class UpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UPS
        exclude = ()

class JbodSerializer(serializers.ModelSerializer):
    class Meta:
        model = JBOD
        exclude = ()

class ProjectPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Unit: UnitSerializer,
        UPS: UpsSerializer,
        JBOD: JbodSerializer,
    }



