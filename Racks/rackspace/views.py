from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializer import RackSerializer, ProjectPolymorphicSerializer
from .serializer import NetworkSerializer, NetworkCardSerializer
from .models import Rack, Unit, Network, NetworkCard
from rest_framework import viewsets, status
import ipaddress
from rest_framework.decorators import api_view

class RackViewSet(viewsets.ModelViewSet):
    queryset = Rack.objects.all()
    serializer_class = RackSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = self.queryset
        public_racks = queryset.filter(public='PB')
        read_only_racks = queryset.filter(public='RO')
        users_racks = queryset.filter(user=self.request.user.id)
        return public_racks | read_only_racks | users_racks


class UnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.all()
    serializer_class = ProjectPolymorphicSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

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

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

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



@api_view(['POST'])
def assign_address(request):
    def get_address(net, prefix, used_address):
        net = ipaddress.ip_network((net, prefix), False)

        for x in net.hosts():
            if x not in used_address:
                return x
        raise RuntimeError('All addresses have been allocated')

    network = Network.objects.get(id=request.data["network"])
    network_card = NetworkCard.objects.get(id=request.data["network_card"])
    active_cards = NetworkCard.objects.filter(network_id=network)
    used_addresses = [x.ip_address for x in active_cards]

    addr = get_address(network.ip_address, network.prefix, used_addresses)
    network_card.ip_address = addr
    network_card.save()
    return Response({"message": "Success"})
