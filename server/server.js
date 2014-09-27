var path = require('path')
  , http = require('http')
  , co = require('co')
  , staticCache = require('koa-static-cache')
  , _ = require('underscore')
  , app = require('./app')
  , wwwDir = path.join(__dirname, '../www')
  , staticDir = path.join(wwwDir, 'static')

function setupStatic() {
  app.use(staticCache(staticDir, {
    prefix: '/static/'
  , maxAge: 365 * 24 * 60 * 60
  }))
}

co(function *initialize() {

  var frontEnd = require('./middleware/frontEnd')

  // Things to do before handling requests
  yield frontEnd.load()

  // Setup request handling
  setupStatic()
  frontEnd.setup()

  // Start listening
  var server = http.createServer(app.callback())
    , port = process.env.PORT || 4126
  server.listen(port)
  console.log('Listening on port ' + port)
})()


