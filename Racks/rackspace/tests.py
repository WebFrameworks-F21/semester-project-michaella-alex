from django.test import TestCase
from .models import Rack
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient


# Create your tests here.
class RackTest(TestCase):
    def setUp(self):
        users = get_user_model()
        user = users.objects.create(username="1", password="7")
        user2 = users.objects.create(username="2")
        Rack.objects.create(name="rack", public="PB", size=4, user_id=user.id)
        Rack.objects.create(name="rack2", public="PR", size=4, user_id=user2.id)


    def test_no_private_racks(self):
        """Tests that get racks does not show private racks"""
        user = get_user_model().objects.get(username="1")
        rack = Rack.objects.get(name="rack")
        rack2 = Rack.objects.get(name="rack2")
        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get('/racks/rackspace/')
        json_data = response.json()
        self.assertEqual(json_data[0]["public"], 'PB')
        self.assertTrue(len(json_data) == 1)

    def test_my_private_racks(self):
        """Tests that get racks does not show private racks"""
        user = get_user_model().objects.get(username="2")
        rack = Rack.objects.get(name="rack")
        rack2 = Rack.objects.get(name="rack2")
        client = APIClient()
        client.force_authenticate(user=user)
        response = client.get('/racks/rackspace/')
        json_data = response.json()
        print(json_data)
        self.assertEqual(json_data[1]["public"], 'PR')
        self.assertTrue(len(json_data) == 2)

    def test_login(self):
        user = get_user_model().objects.get(username="1")
        client = APIClient()
        res = client.post('/api-auth/', {"username": "1", "password": "7"}, format="json")
        print(res)
        self.assertTrue(res)
