import ipaddress

from rest_framework import routers, serializers, viewsets
from rest_framework.fields import SerializerMethodField

from .models import *
from rest_polymorphic.serializers import PolymorphicSerializer

def check_fit(data):
    units = Unit.objects.filter(rack=data['rack'])
    bottom = 0
    top = data['rack'].size
    start = data['start']
    end = start + data['size']
    if start < bottom or end < bottom:
        raise serializers.ValidationError('Object does not fit')
    if start > top or end > top:
        raise serializers.ValidationError('Object does not fit')
    for unit in units:
        unit_start = unit.start
        unit_end = unit_start + unit.size
        if unit_start <= start < unit_end:
            raise serializers.ValidationError('Object does not fit')
        if unit_start < end <= unit_end:
            raise serializers.ValidationError('Object does not fit')


def check_ip_valid(data):
    network = data.get("network_id", False)
    ip_text = data.get("ip_address", False)
    if network and ip_text:
        net = ipaddress.ip_network((network.ip_address, network.prefix), False)
        ip = ipaddress.ip_address(ip_text)
        if ip not in net.hosts():
            raise serializers.ValidationError('IP Address not valid for this network')
    return data


class NetworkCardSerializer(serializers.ModelSerializer):

    def validate(self, data):
        check_ip_valid(data)
        return data

    class Meta:
        model = NetworkCard
        exclude = ()

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        exclude = ()

class RackSerializer(serializers.ModelSerializer):
    items = SerializerMethodField(method_name='get_units')

    class Meta:
        model = Rack
        fields = ['id', 'name', 'size', 'user', 'public', 'items']

    def get_units(self, instance):
        items = instance.items.order_by('start')
        return UnitSerializer(items, many=True).data


class SimpleRackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rack
        fields = ['id', 'name', 'size', 'user', 'public']



class UpsSerializer(serializers.ModelSerializer):
    rack_detail = SimpleRackSerializer(source='rack', required=False)
    user = serializers.StringRelatedField()

    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = UPS
        exclude = ()

class JbodSerializer(serializers.ModelSerializer):
    rack_detail = SimpleRackSerializer(source='rack', required=False)
    user = serializers.StringRelatedField()

    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = JBOD
        exclude = ()


class ServerSerializer(serializers.ModelSerializer):
    rack_detail = SimpleRackSerializer(source='rack', required=False)
    cards = NetworkCardSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField()

    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = Server
        exclude = ()

class PatchPanelSerializer(serializers.ModelSerializer):
    rack_detail = SimpleRackSerializer(source='rack', required=False)
    user = serializers.StringRelatedField()

    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = PatchPanel
        exclude = ()

class SwitchSerializer(serializers.ModelSerializer):
    rack_detail = SimpleRackSerializer(source='rack', required=False)
    user = serializers.StringRelatedField()

    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = Switch
        exclude = ()


class ProjectPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        Unit: UnitSerializer,
        UPS: UpsSerializer,
        JBOD: JbodSerializer,
        Switch: SwitchSerializer,
        PatchPanel: PatchPanelSerializer,
        Server: ServerSerializer
    }


class NetworkSerializer(serializers.ModelSerializer):
    devices = NetworkCardSerializer(many=True, read_only=True)

    class Meta:
        model = Network
        exclude = ()





