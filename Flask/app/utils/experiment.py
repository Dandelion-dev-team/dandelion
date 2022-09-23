from app.utils.functions import row2dict


def getTreatmentVariables(experiment):
	clevels = []
	for element in [c.levels for c in experiment.conditions]:
		clevels.extend([cl for cl in element])

	return list(set([cl.level.variable for cl in clevels]))

def getVariableDict(variable):
	result = row2dict(variable)
	result['type'] = 'continuous'
	if len(variable.levels) > 0:
		result['type'] = 'discrete'
	return result
