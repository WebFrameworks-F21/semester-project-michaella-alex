from django.contrib import admin
from .models import *

admin.site.register(Rack)
admin.site.register(PatchPanel)
admin.site.register(UPS)
admin.site.register(JBOD)
admin.site.register(Switch)
admin.site.register(Server)
admin.site.register(Network)
admin.site.register(NetworkCard)

