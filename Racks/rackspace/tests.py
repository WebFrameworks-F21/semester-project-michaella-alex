from django.test import TestCase
from .models import Rack, PatchPanel, Server, Network, NetworkCard
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

class UnitTest(TestCase):
    def setUp(self):
        users = get_user_model()
        user = users.objects.create(username="1", password="7")
        rack = Rack.objects.create(id=1, name="rack", size=48, user=user)

    def test_fits(self):
        rack = Rack.objects.get(name="rack")
        client = APIClient()
        user = get_user_model().objects.get(username="1")
        client.force_authenticate(user=user)
        response = client.post('/racks/unit/',
               {'name': 'g', 'size': 4, 'start': 1, 'rack': rack.id, 'ports':4, 'resourcetype':'PatchPanel'},
                               format='json')
        self.assertEqual(response.status_code, 201)
        response = client.post('/racks/unit/',
                   {'name': '3', 'size': 4, 'start': 8, 'rack': rack.id, 'ports': 4, 'resourcetype': 'PatchPanel'},
                   format='json')
        self.assertEqual(response.status_code, 201)

    def test_no_fits(self):
        rack = Rack.objects.get(name="rack")
        client = APIClient()
        user = get_user_model().objects.get(username="1")
        client.force_authenticate(user=user)
        response = client.post('/racks/unit/',
               {'name': 'g', 'size': 4, 'start': 1, 'rack': rack.id, 'ports':4, 'resourcetype':'PatchPanel'},
                               format='json')
        self.assertEqual(response.status_code, 201)
        response = client.post('/racks/unit/',
                   {'name': '3', 'size': 4, 'start': 1, 'rack': rack.id, 'ports': 4, 'resourcetype': 'PatchPanel'},
                   format='json')
        self.assertEqual(response.status_code, 400)


class NetworkTest(TestCase):
    def setUp(self):
        users = get_user_model()
        user = users.objects.create(username="1", password="7")
        rack = Rack.objects.create(id=1, name="rack", size=48, user=user)
        server = Server.objects.create(
            size=4, start=2, name="server", rack=rack,
            cpu=2, ram=2, graphics=2, hdisk_size =4
        )
        network = Network.objects.create(
            user=user,
            name='Network',
            public='PB',
            ip_address='192.155.155.0',
            prefix=24
        )
        NetworkCard.objects.create(
            id=1,
            server_id=server
        )

    def test_assignment(self):
        network_card = NetworkCard.objects.get(id=1)
        network = Network.objects.get(name='Network')
        client = APIClient()
        user = get_user_model().objects.get(username="1")
        client.force_authenticate(user=user)
        response = client.post('/racks/assign-ip',
        {'network_card': network_card.id, 'network': network.id},
        format = 'json')
        self.assertEqual(response.status_code, 201)
