from django.db import models
from django.conf import settings


class Public(models.Model):
    STATUS_TYPES = [
        ('PR', 'Private'),
        ('RO', 'Read-Only'),
        ('PB', 'Public'),
    ]
    status = models.CharField(max_length=2, choices=STATUS_TYPES, default='PR')

class Rack(models.Model):
    name = models.CharField(max_length = 25)
    user =  models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    size = models.IntegerField()
    public = models.ManyToManyField(Public)
    
class Unit(models.Model):
    name = models.CharField(max_length=255)
    size = models.IntegerField()
    rack = models.ForeignKey(Rack, on_delete=models.CASCADE)
    start = models.IntegerField()
    public = models.ManyToManyField(Public)

    class Meta: 
        abstract = True

class PatchPanel(Unit):
    Ports = models.IntegerField()


    
