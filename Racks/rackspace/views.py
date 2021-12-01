from rest_framework import viewsets
from .serializer import RackSerializer
from .models import Rack, Unit

class RackViewSet(viewsets.ModelViewSet):
    queryset = Rack.objects.all()
    serializer_class = RackSerializer

    def get_queryset(self):
        queryset = self.queryset
        public_racks = queryset.filter(public='PB')
        users_racks = queryset.filter(user=self.request.user.id)
        return public_racks | users_racks






# Create your views here.
