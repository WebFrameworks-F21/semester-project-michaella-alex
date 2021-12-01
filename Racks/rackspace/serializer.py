from rest_framework import routers, serializers, viewsets
from .models import Unit, Rack


class RackSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rack
        fields = ['name', 'size']


# Serializers define the API representation.
class UnitSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Unit
        exclude = ()
