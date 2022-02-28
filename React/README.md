# Dandelion React app

### The React app provides the UI for school users and the general public.

## Local Installation Instructions
1. Install latest version of LTS Node.js (https://nodejs.org/en/download/)
2. Conduct a global installation of the npm packages required to run the project - ‘npm i’
3. Run ‘gatsby develop’, either inside your editor’s terminal or inside a terminal window in the root ‘Dandelion’ folder (inside dandelion/React/dandelion)
4. Navigate to the url where the application is running (typically [http://localhost:8000/](http://localhost:8000/))

## Server Installation Instructions
1. Install NGINX on server using SSH.
2. Run "sudo apt-get install nodejs"
3. Test nodeJS is installed correctly by running "nodejs -v" and "npm -v"
4. Clone the ./dandelion/React/dandelion repo folder and cd into it.
5. Run "npm install" to install the required packages.
6. In the root directory of the project create a folder called "etc" and within that folder create a folder called "nginx". 
7. In this folder create a "nginx.conf" file.
8. In this file add the following: 

user nobody;

http { 
  server {
    listen PORT_NUMBER;
    
    location / {
      root dandelion/React/dandelion;
      index ./src/pages/index.js;
    }
  }
}
