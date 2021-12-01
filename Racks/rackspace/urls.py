from rest_framework import routers
from django.urls import path, include
from .views import RackViewSet
router = routers.DefaultRouter()
router.register(r'rackspace', RackViewSet)

urlpatterns = [
    path('racks/', include(router.urls)),
]