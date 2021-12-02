from rest_framework import routers, serializers, viewsets
from .models import *


class RackSerializer(serializers.ModelSerializer ):
    class Meta:
        model = Rack
        fields = ['name', 'size', 'user', 'public']



