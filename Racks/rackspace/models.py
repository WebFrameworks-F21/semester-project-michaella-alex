from django.core.exceptions import ValidationError
from django.db import models
from django.conf import settings

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from polymorphic.models import PolymorphicModel

from rest_framework.authtoken.models import Token

STATUS_TYPES = [
    ('PR', 'Private'),
    ('RO', 'Read-Only'),
    ('PB', 'Public'),
]

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class Rack(models.Model):
    name = models.CharField(max_length = 25)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    size = models.IntegerField()
    public = models.CharField(max_length=2, choices=STATUS_TYPES, default='PR')

    def __str__(self):
        return "{} ({})".format(self.name, self.user)



class Unit(PolymorphicModel):
    name = models.CharField(max_length=255)
    size = models.IntegerField()
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE, related_name='items')
    start = models.IntegerField()
    public = models.CharField(max_length=2, choices=STATUS_TYPES, default='PR')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return "{} ({})".format(self.name, self.rack.user)



class PatchPanel(Unit):
    ports = models.IntegerField()


class UPS(Unit):
    watt_hours = models.FloatField()
    max_watts = models.FloatField()
    outlets = models.IntegerField()
    surge_protection = models.BooleanField()


class JBOD(Unit):
    disk_slots = models.IntegerField()
    hdisk_size = models.FloatField()


class Switch(Unit):
    ports = models.IntegerField()


class Server(Unit):
    cpu = models.FloatField()  # gigahertz
    ram = models.FloatField()
    hdisk_size = models.FloatField()
    graphics = models.FloatField()


class Network(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length = 25)
    public = models.CharField(max_length=2, choices=STATUS_TYPES, default='PR')
    ip_address = models.GenericIPAddressField(blank=True, null=True, protocol='IPv4')
    prefix = models.IntegerField()

    def __str__(self):
        return "{} ({})".format(self.name, self.user)




class NetworkCard(models.Model):
    server_id = models.ForeignKey(Server, on_delete=models.CASCADE, related_name='cards')
    network_id = models.ForeignKey(Network, on_delete=models.SET_NULL, null=True, blank=True, related_name='devices')
    ip_address = models.GenericIPAddressField(blank=True, null=True, protocol='IPv4')

    class Meta:
        unique_together = ['network_id', 'ip_address']

    def __str__(self):
        return "{}, ({})".format(self.ip_address, self.server_id)
