var path = require('path')
  , fs = require('fs')
  , http = require('http')
  , co = require('co')
  , thunkify = require('thunkify')
  , staticCache = require('koa-static-cache')
  , _ = require('underscore')
  , app = require('./app')
  , read = thunkify(fs.readFile)
  , wwwDir = path.join(__dirname, '../www')
  , staticDir = path.join(wwwDir, 'static')

function setupStatic() {
  app.use(staticCache(staticDir, {
    prefix: '/static/'
  , maxAge: 365 * 24 * 60 * 60
  }))
}

function setupWelcome(template) {
  var compiledTemplate = _.template(template)({
    staticBase: '/static'
  })
  app.use(function *welcome(next) {
    // FIXME if (this.request.path != '/') return yield next
    this.type = 'html'
    this.body = compiledTemplate
  })
}

co(function *initialize() {
  // Things to do before handling requests
  var template = yield read(path.join(wwwDir, 'index.html'), 'utf8')

  // Setup request handling
  setupStatic()
  setupWelcome(template)

  // Start listening
  var server = http.createServer(app.callback())
    , port = process.env.PORT || 4126
  server.listen(port)
  console.log('Listening on port ' + port)
})()


