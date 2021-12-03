from rest_framework import routers, serializers, viewsets
from .models import *
from rest_polymorphic.serializers import PolymorphicSerializer




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
    class Meta:
        model = UPS
        exclude = ()

class JbodSerializer(serializers.ModelSerializer):
    class Meta:
        model = JBOD
        exclude = ()


class ServerSerializer(serializers.ModelSerializer):
    cards = NetworkCardSerializer(many=True, read_only=True)

    class Meta:
        model = Server
        exclude = ()

class PatchPanelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatchPanel
        exclude = ()

class SwitchSerializer(serializers.ModelSerializer):
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




