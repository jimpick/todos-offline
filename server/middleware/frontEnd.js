var fs = require('fs')
  , path = require('path')
  , _ = require('underscore')
  , thunkify = require('thunkify')
  , read = thunkify(fs.readFile)
  , app = require('../app')
  , wwwDir = path.join(__dirname, '../../www')
  , template

// Read template from disk into memory
function *load() {
  template = yield read(path.join(wwwDir, 'index.html'), 'utf8')
}

// Call this after load has finished
function setup() {
  var compiledTemplate = _.template(template)
  app.use(function *welcome(next) {
    // FIXME if (this.request.path != '/') return yield next
    var user = {}
    if (this.isAuthenticated()) {
      user.email = this.req.user.email
    }
    console.log('Jim', this.request.path, this.isAuthenticated(), this.req.user)
    this.type = 'html'
    this.body = compiledTemplate({
      staticBase: '/static'
    , isLoggedIn: this.isAuthenticated()
    , user: user
    })
  })
}

module.exports = {
  load: load
, setup: setup
}


