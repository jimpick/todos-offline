todos-offline
=============

Keep Todo lists for multiple users in local PouchDB inside the
web-browser, and also syncs to a shared CouchDB hosted on Cloudant.

[![Dependency Status](https://david-dm.org/backblend/todos-offline.svg)](https://david-dm.org/backblend/todos-offline)
[![devDependency Status](https://david-dm.org/backblend/todos-offline/dev-status.svg)](https://david-dm.org/backblend/todos-offline#info=devDependencies)

# Demo

https://todos-offline.herokuapp.com/

# Deploy this to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

# License

Apache

# Development Notes

This project is using Koa and ES6 generators, which will be in the next
stable version of Node.js.

* Install Node.js v0.11.14

    http://nodejs.org/dist/v0.11.14/

* Ensure the correct version of node is in your PATH

    node -v
    v0.11.14

* Install npm modules

    npm install

* Setup config.js

    cp config.js.example config.js

* Run grunt (via npm, so --harmony flag is passed, see: http://stackoverflow.com/questions/17748806/how-to-add-harmony-node-flag-to-grunt-express )

    npm start

  This will start a local web server.

  Sometimes, it's helpful to just run the web server directly:

    node --harmony server/server.js

# Roadmap

* Email configuration and password recovery
* Allow users to change password
* Store sessions in redis so they aren't lost on server restart
* Proxy for Cloudant so API keys don't need to be shared with client
* Redirect to SSL if not in dev mode
* Select CSS framework and add styling
* Test framework and code coverage
* Update marionette, clean up client side
* Offline / Sync feedback
* Analytics (Segment.io, Google Analytics, Keen.io)
* ServiceWorker support
* Admin interface
* Client-side dependencies using npm or bower
* iOS Phonegap app
* Android Phonegap app
* Experiment with alternate implementations (Angular/Ionic, Ember, React, Meteor, Rendr, native iOS, native Android)
* Social features, shared Todo lists

# Credits

Built by [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

