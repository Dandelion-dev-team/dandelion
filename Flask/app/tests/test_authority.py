import json
from flask_jwt_extended import create_access_token


class TestAuthority:
    def test_list_authority(self, client):
        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token)
            }
            response = client.get('/api/authority', headers=headers)
        j = json.loads(response.data)
        assert j["data"][0]["name"] == "Dandelion"

    def test_get_one_authority(self, client):
        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token),
                'Content-Type': 'application/json'
            }
            response = client.get('/api/authority/1',
                                  headers=headers,
                                  )
        j = json.loads(response.data)
        assert j["Authority"]["name"] == "Dandelion"

    def test_update_authority(self, client):
        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token),
                'Content-Type': 'application/json'
            }
            response = client.put('/api/authority/1',
                                   headers=headers,
                                   json={
                                       "name": "Dandelion",
                                       "telephone": "012345678",
                                       "email": ""
                                   })
        j = json.loads(response.data)
        assert j["message"] == "Authority has been updated"


    def test_add_delete_authority(self, client):
        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token)
            }
            response = client.post('/api/authority',
                                   headers=headers,
                                   json={
                                       "name": "New authority",
                                       "telephone": "012345678",
                                       "email": "info@newauth.gov"
                                   })
            j = json.loads(response.data)
            assert j["message"] == "New authority has been registered"

            response = client.delete('/api/authority/' + str(j['id']),
                                   headers=headers,
                                   )
        j = json.loads(response.data)
        assert j["message"] == "The Authority has been deleted"
