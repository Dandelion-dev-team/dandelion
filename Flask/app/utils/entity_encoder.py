from json import JSONEncoder


# subclass JSONEncoder
class EntityEncoder(JSONEncoder):
    def default(self, o):
        return o.__dict__