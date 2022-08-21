from app.admin import admin
from app.models import ResponseVariable
from app.utils.functions import row2dict, jwt_user


# This route is PUBLIC
@admin.route('/response_variable/blank', methods=['GET'])
def get_blank_response_variable():
    variable = ResponseVariable()
    return {'response_variable': row2dict(variable)}
