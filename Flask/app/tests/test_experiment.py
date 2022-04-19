import json

from app.models import Experiment, Hypothesis, Variable
from app.tests.json_strings.experiment_all_new_variables import test_dict
from flask_jwt_extended import create_access_token


class TestExperiment:
	def test_experiment(self, client):
		with client:
			access_token = create_access_token('admin')
			headers = {
				'Authorization': 'Bearer {}'.format(access_token)
			}
			response = client.post('/api/experiment',
			                       headers=headers,
			                       json=test_dict())
			j = json.loads(response.data)
			assert j["id"] == 1

			experiment = Experiment.query.first()
			assert experiment.title == "Thigmomorphogenesis experiment"

			hypothesis_list = Hypothesis.query.all()
			assert len(hypothesis_list) == 2

			variable_list = Variable.query.all()
			assert len(variable_list) == 4


