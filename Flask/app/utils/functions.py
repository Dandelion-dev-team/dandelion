from app.models.users import User

def row2dict(row, summary=False):
    d = {}

    for column in row.__table__.columns:
        if (summary and column.name in row.summary_columns) or not summary:
            d[column.name] = str(getattr(row, column.name))


    return d

def jwt_user (username):

    return User.query.filter(User.username == username).first()