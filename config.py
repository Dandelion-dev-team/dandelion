class Config(object):
    """Common configurations"""


class DevelopmentConfig(Config):
    DEBUG = True
    SLQALCHEMY_ECHO = True


class ProductionConfig(Config):
    DEBUG = False


app_config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig
}