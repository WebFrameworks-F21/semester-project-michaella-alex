from rest_framework import routers, serializers, viewsets
from .models import Unit, Rack


class RackSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Rack
        fields = ['name', 'size', 'user']


