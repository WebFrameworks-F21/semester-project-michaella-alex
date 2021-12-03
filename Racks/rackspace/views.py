from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializer import RackSerializer, ProjectPolymorphicSerializer
from .serializer import NetworkSerializer, NetworkCardSerializer
from .models import Rack, Unit, Network, NetworkCard
from rest_framework import viewsets, status



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
        set = public_units | read_only_units | users_units
        return set.order_by('start')


class NetworkViewSet(viewsets.ModelViewSet):
    queryset = Network.objects.all()
    serializer_class = NetworkSerializer

    def get_queryset(self):
        queryset = self.queryset
        public_networks = queryset.filter(public='PB')
        read_only_networks = queryset.filter(public='RO')
        users_networks = queryset.filter(user=self.request.user.id)
        return public_networks | read_only_networks | users_networks


class NetworkCardViewSet(viewsets.ModelViewSet):
    queryset = NetworkCard.objects.all()
    serializer_class = NetworkCardSerializer

    def list(self, request, *args, **kwargs):
        response = {'message': 'List function is not offered in this path.'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)