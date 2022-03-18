# Dandelion React app

### The React app provides the UI for school users and the general public.

## Local Installation Instructions
1. Install latest version of LTS Node.js (https://nodejs.org/en/download/)
2. cd to the React/dandelion directory
3. Conduct a global installation of the npm packages required to run the project - ```npm i```
4. Run ‘gatsby develop’, either inside your editor’s terminal or inside a terminal window in the root ‘Dandelion’ folder (inside dandelion/React/dandelion)
5. Navigate to the url where the application is running (typically [http://localhost:8000/](http://localhost:8000/))

## Server Installation Instructions
1. Install NGINX on server using SSH.
2. Run "sudo apt-get install nodejs"
3. Test nodeJS is installed correctly by running "nodejs -v" and "npm -v"
4. Install npm: `sudo apt install npm`
5. Clone the ./dandelion/React/dandelion repo folder and cd into it.
6. Run "npm install" to install the required packages.
7. Build the minified application with `gatsby build`

## Migrating changes to the server

1. Deploy the new code
2. cd to React root directory
3. run `npm install` in case there are any new packages
4. run `gatsby build`
5. Restart Dandelion Flask service with `sudo service dandelion restart`
