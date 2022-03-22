import json
from datetime import datetime
from flask_jwt_extended import create_access_token


class TestProject:
    def test_list_project(self, client):
        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token)
            }
            response = client.get('/api/project', headers=headers)
        j = json.loads(response.data)
        assert j["data"][0]["title"] == "Thigmomorphogenesis"

    def test_add_delete_project(self, client):
        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token),
                'Content-Type': 'application/json'
            }
            response = client.post('/api/project',
                                   headers=headers,
                                   json={
                                       'title': 'Plant nutrition',
                                       'description': 'Feeding plants',
                                       'project_image_link': "",
                                       'project_text': "No text",
                                       'start_date': datetime.now(),
                                       'end_date': datetime.now(),
                                       'status': 'A'
                                   })

            j = json.loads(response.data)
            assert j["message"] == "New project has been registered"

            response = client.delete('/api/project/' + str(j['id']),
                                     headers=headers,
                                     )
        j = json.loads(response.data)
        assert j["message"] == "The Project has been deleted"

    def test_get_one_project(self, client):
        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token),
                'Content-Type': 'application/json'
            }
            response = client.get('/api/project/1',
                                  headers=headers,
                                  )
        j = json.loads(response.data)
        assert j["Project"]["title"] == "Thigmomorphogenesis"

    def test_update_project(self, client):
        with client:
            access_token = create_access_token('admin')
            headers = {
                'Authorization': 'Bearer {}'.format(access_token),
                'Content-Type': 'application/json'
            }
            response = client.put('/api/project/1',
                                   headers=headers,
                                   json={
                                       "title": "Dandelion",
                                       "description": "012345678",
                                       "project_text": "",
                                       "project_image_link": "",
                                       "start_date": datetime.now(),
                                       "end_date": datetime.now(),
                                       "status": 'B'
                                   })
        j = json.loads(response.data)
        assert j["message"] == "Project has been updated"
