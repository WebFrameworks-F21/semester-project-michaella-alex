from rest_framework import viewsets
from .serializer import RackSerializer
from .models import Rack, Unit


class RackViewSet(viewsets.ModelViewSet):
    queryset = Rack.objects.all()
    serializer_class = RackSerializer




# Create your views here.
