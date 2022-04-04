import logging

class Config(object):
    """Common configurations"""


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_ECHO = True
    LOGLEVEL = logging.DEBUG
    logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


class ProductionConfig(Config):
    DEBUG = False
    LOGLEVEL = logging.ERROR


app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}

# Coming from /instance/config.py

# from datetime import timedelta
# SECRET_KEY =
# JWT_SECRET_KEY =
# SQLALCHEMY_DATABASE_URI =
# JWT_TOKEN_LOCATION = ["cookies"]  # ["headers", "cookies", "json", "query_string"] <-- last version
# JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=24)
# JWT_COOKIE_SECURE = False
# JWT_COOKIE_CSRF_PROTECT = True
# JWT_CSRF_CHECK_FORM = True
# IMAGE_UPLOADS =
# ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
# MAX_CONTENT_LENGTH =

