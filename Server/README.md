# Server code

The code in this section needs to be maintained on the server itself. It includes configuration settings and server scripts such as crontab files.

## Installation Instructions (React app)
1. Install NGINX on server using SSH.
2. Run "sudo apt-get install nodejs"
3. Test nodeJS is installed correctly by running "nodejs -v" and "npm -v"
4. Install npm: `sudo apt install npm`
5. Clone the ./dandelion/React/dandelion repo folder and cd into it.
6. Run "npm install" to install the required packages.
7. Build the minified application with `gatsby build`

## Migrating changes to the server (general)

1. Back up the Flask/instance/config.py file
2. Deploy the new code
3. cd to Flask root directory
4. activate the virtual environment
5. install any new packages
6. check for changes to instance/config.py and restore orginal settings from backup
7. set environment variable `export FLASK_APP="app:create_app('development')"`
8. run database migrations: `flask db upgrade` See [here](https://www.arundhaj.com/blog/multiple-head-revisions-present-error-flask-migrate.html) to resolve multiple head revisions error
9. cd to React root directory
10. run `npm install` in case there are any new packages
11. run `gatsby build`
12. Restart Dandelion Flask service with `sudo service dandelion restart`
