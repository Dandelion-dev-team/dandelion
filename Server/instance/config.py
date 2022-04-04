# These are the settings that are required to configure the instance
# The values are examples: actual values should be changed for security

SECRET_KEY = 'v4Ja(7iI!$8Dv94'
JWT_SECRET_KEY ='p9Bv<8Fid9%$j01'
SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://dan:passwd@localhost/dandelion'
JWT_TOKEN_LOCATION = ["cookies"]
JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(hours=24)
JWT_COOKIE_SECURE = False
JWT_COOKIE_CSRF_PROTECT = True
JWT_CSRF_CHECK_FORM = True
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
CONTENT_ROOT_UPLOAD = '/var/www/html/dandelion'
CONTENT_ROOT_DOWNLOAD = '/content'
LOGFILE = '/var/log/dandelion.log'
