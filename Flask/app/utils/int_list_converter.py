from werkzeug.routing import BaseConverter


class IntListConverter(BaseConverter):
    """
    See:
        -   https://stackoverflow.com/questions/35437180/capture-a-list-of-integers-with-a-flask-route
        -   https://werkzeug.palletsprojects.com/en/2.2.x/routing/
    """
    regex = r'\d+(?:,\d+)*,?'

    def to_python(self, value):
        return [int(x) for x in value.split(',')]

    def to_url(self, value):
        return ','.join(str(x) for x in value)
