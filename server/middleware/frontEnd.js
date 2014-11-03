var fs = require('fs')
var path = require('path')
var _ = require('underscore')
var thunkify = require('thunkify')
var read = thunkify(fs.readFile)
var config = require('../config')
var app = require('../app')
var wwwDir = path.join(__dirname, '../../www')
var template

// Read template from disk into memory
function *load() {
  template = yield read(path.join(wwwDir, 'index.html'), 'utf8')
}

// Call this after load has finished
function setup() {
  var compiledTemplate = _.template(template)
  app.use(function *welcome(next) {
    // FIXME Use router and load routes from frontend
    if (
      this.request.path != '/' &&
      this.request.path != '/login' &&
      this.request.path != '/forgot-password' &&
      this.request.path != '/register'
    ) return yield next

    var user = {}
    if (this.isAuthenticated()) {
      user._id = this.req.user._id
      user.email = this.req.user.email
    }
    this.type = 'html'
    this.body = compiledTemplate({
      staticBase: '/static'
    , isLoggedIn: this.isAuthenticated()
    , user: user
    , cloudantUrl: 'https://' + config.cloudant.username + ':' +
        config.cloudant.password + '@' + config.cloudant.username +
        '.cloudant.com/' + config.cloudant.db
    })
  })
}

module.exports = {
  load: load
, setup: setup
}


