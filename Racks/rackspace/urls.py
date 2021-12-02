from rest_framework import routers
from django.urls import path, include
from .views import RackViewSet, UnitViewSet
router = routers.DefaultRouter()
router.register(r'rackspace', RackViewSet)
router.register(r'unit', UnitViewSet)

urlpatterns = [
    path('racks/', include(router.urls)),
]