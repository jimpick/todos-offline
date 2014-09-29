var http = require('http')
var co = require('co')
var app = require('./app')

co(function *initialize() {
  var frontEnd = require('./middleware/frontEnd')
  var cloudant = require('./lib/cloudant')

  // Things to do before handling requests
  yield cloudant.createDatabases()
  yield frontEnd.load() // Loads the template from disk

  // Setup request handling -- order is important
  require('./middleware/staticAssets') // Static Assets
  require('./middleware/passport') // Passport Authentication
  require('./middleware/api') // API
  frontEnd.setup() // Template renderer

  // Start listening
  var server = http.createServer(app.callback())
  var port = process.env.PORT || 4126
  server.listen(port)
  console.log('Listening on port ' + port)
})()

