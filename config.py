import logging

class Config(object):
    """Common configurations"""


class DevelopmentConfig(Config):
    SQLALCHEMY_ECHO = True
    LOGLEVEL = logging.DEBUG
    logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

class DevelopmentConfig(Config):
    DEBUG = True
    SLQALCHEMY_ECHO = True


class ProductionConfig(Config):
    DEBUG = False


app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}