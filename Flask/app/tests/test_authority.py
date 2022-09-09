import json
from flask_jwt_extended import create_access_token

from app import db
from app.models import Authority


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

        test2 = Authority(
            name = 'Auth2',
            telephone = '1234567890',
            email = 'someone@somewhere'
        )

        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token),
                'Content-Type': 'application/json'
            }
            db.session.add(test2)
            db.session.commit()

            expected = "012345678"
            response = client.put('/api/authority/1',
                                   headers=headers,
                                   json={
                                       "name": "Dandelion",
                                       "telephone": expected,
                                       "email": ""
                                   })
            response2 = None
            try:
                response2 = client.put('/api/authority/' + str(test2.id),
                                       headers=headers,
                                       json={
                                           "name": "",
                                           "telephone": "",
                                           "email": ""
                                       })
            except:
                pass

        j = json.loads(response.data)
        j2 = json.loads(response2.data)

        actual = Authority.query.get(1)

        assert j["message"] == "Authority has been updated"
        assert actual.telephone == expected

        actual = Authority.query.get(test2.id)

        assert actual.name != ""


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
