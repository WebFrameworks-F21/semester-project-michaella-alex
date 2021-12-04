from rest_framework import routers
from django.urls import path, include
from .views import assign_address
from .views import RackViewSet, UnitViewSet, NetworkViewSet, NetworkCardViewSet
router = routers.DefaultRouter()
router.register(r'rackspace', RackViewSet)
router.register(r'unit', UnitViewSet)
router.register(r'card', NetworkCardViewSet)
router.register(r'network', NetworkViewSet)

urlpatterns = [
    path('racks/', include(router.urls)),
    path('racks/assign-ip', assign_address)
]