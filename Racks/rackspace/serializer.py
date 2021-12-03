from rest_framework import routers, serializers, viewsets
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
        if unit_start < start < unit_end:
            raise serializers.ValidationError('Object does not fit')
        if unit_start < end < unit_end:
            raise serializers.ValidationError('Object does not fit')

class NetworkCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = NetworkCard
        exclude = ()

class UnitSerializer(serializers.ModelSerializer):

    class Meta:
        model = Unit
        exclude = ()

class RackSerializer(serializers.ModelSerializer):
    items = UnitSerializer(many=True, read_only=True)

    class Meta:
        model = Rack
        fields = ['id', 'name', 'size', 'user', 'public', 'items']

class UpsSerializer(serializers.ModelSerializer):

    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = UPS
        exclude = ()

class JbodSerializer(serializers.ModelSerializer):

    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = JBOD
        exclude = ()


class ServerSerializer(serializers.ModelSerializer):
    cards = NetworkCardSerializer(many=True, read_only=True)

    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = Server
        exclude = ()

class PatchPanelSerializer(serializers.ModelSerializer):
    def validate(self, data):
        check_fit(data)
        return data

    class Meta:
        model = PatchPanel
        exclude = ()

class SwitchSerializer(serializers.ModelSerializer):
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
        fields = ['user', 'name', 'public', 'devices']




