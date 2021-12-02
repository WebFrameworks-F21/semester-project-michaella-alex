from rest_framework import viewsets
from .serializer import RackSerializer, ProjectPolymorphicSerializer
from .models import Rack, Unit

class RackViewSet(viewsets.ModelViewSet):
    queryset = Rack.objects.all()
    serializer_class = RackSerializer

    def get_queryset(self):
        queryset = self.queryset
        public_racks = queryset.filter(public='PB')
        read_only_racks = queryset.filter(public='RO')
        users_racks = queryset.filter(user=self.request.user.id)
        return public_racks | read_only_racks | users_racks


class UnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = ProjectPolymorphicSerializer

    def get_queryset(self):
        queryset = self.queryset
        public_units = queryset.filter(public='PB')
        read_only_units = queryset.filter(public='RO')
        users_units = queryset.filter(rack__user=self.request.user.id)
        return public_units | read_only_units | users_units





# Create your views here.
