# BeeStock WebApp
BeeStock is an images stock platform. It has features of both traditional and social images stock websites with features similar to [500px](http://500px.com) and [shutterstock](http://shutterstock.com)

The platform allows users to upload, download, purchase photos and footage and any relevant
textual content and the implementation of these features are left to the contractor to decide and
according to the software development industry best practices.

## Getting Started For Development
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


* **Prerequisites**
  - [node.js-v8.x](https://nodejs.org/en/download/)
  - [git-v2.x](https://git-scm.com/downloads)


* **Install Dependencies**
  
```bash
  git clone https://github.com/esna-technlogies/beestock-webapp.git
  cd beestock-webapp/vuejs-app
  npm install
```
 

  * **Running The project**
  
```bash
  npm run dev
``` 


## Getting Started For Production
These instructions will get you a copy of the project up and running on Ubuntu 16.04 for production.

* **Prerequisites**
  - [node.js-v8.x](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
  - [forever](https://www.npmjs.com/package/forever#installation)
  - [git-v2.x](https://git-scm.com/download/linux)
  
```bash
# Install node.js
  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  sudo apt-get install -y nodejs
  node --version
```

```bash
# Install forever
  npm install -g forever
  forever --version
```

```bash
# Install git
  sudo add-apt-repository ppa:git-core/ppa
  sudo apt update
  sudo apt -y install git
  git --version
```

  
  * **Prepare The Project Structure**
  
```bash
  mkdir -p ~/project/logs
  cd ~/project
```

  * **Configure `express.js` To Serve The App**
```
  npm install express --save
  cat <<EOF > ~/project/server.js
  const express = require('express');
  const path = require('path');
  const serveStatic = require('serve-static');

  let app = express();
  app.use(serveStatic(__dirname + "/dist"));

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log('Listening on port ' + port)
  });
  EOF
```


  * **Clone/Build *develop* Branch Then Install Dependencies**
```bash
  cd ~
  git clone -b develop https://github.com/esna-technlogies/beestock-webapp.git
  cd beestock-webapp
  npm install
  npm run build
```


  * **Configure The Firewall To Redirect From 80 To 8080**
```
  sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

  * **Create Aliases for Start/Stop/Restart**
```bash
  alias start_app='forever start ~/project/server.js'
  alias restart_app='forever restart ~/project/server.js'
  alias stop_app='forever stop ~/project/server.js'
```

  * **Start/Stop/Restart The project**
```bash
  # Run any of the following aliases
  start_app
  restart_app
  stop_app
```

## Built With
* [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
* [Node.js](https://nodejs.org/en/) - The JavaScript runtime

## Versioning
Still under development

## License
This project is licensed under the MIT License.
