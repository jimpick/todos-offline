var fs = require('fs')
var path = require('path')
var _ = require('underscore')
var thunkify = require('thunkify')
var read = thunkify(fs.readFile)
var config = require('../config')
var router = require('../lib/router')
var app = require('../app')
var wwwDir = path.join(__dirname, '../../www')
var template
var templateMarty

// Read template from disk into memory
function *load() {
  template = yield read(path.join(wwwDir, 'index.html'), 'utf8')
  templateMarty = yield read(path.join(wwwDir, 'marty.html'), 'utf8')
}

function pageGenerator (compiledTemplate) {
  return function *welcome(next) {
    console.log('path', this.request.path)

    var user = {}
    if (this.isAuthenticated()) {
      user._id = this.req.user._id
      user.email = this.req.user.email
      user.apiKey = this.req.user.apiKey
      user.apiPassword = this.req.user.apiPassword
    }
    this.type = 'html'
    this.body = compiledTemplate({
      staticBase: '/static'
    , isLoggedIn: this.isAuthenticated()
    , user: user
    , cloudant: {
        account: config.cloudant.username
      , db: config.cloudant.db
      }
    })
  }
}

// Call this after load has finished
function setup() {
  router.get('/', pageGenerator(_.template(template)))
  router.get('/login', pageGenerator(_.template(template)))
  router.get('/forgot-password', pageGenerator(_.template(template)))
  router.get('/register', pageGenerator(_.template(template)))

  router.get('/marty', pageGenerator(_.template(templateMarty)))
  router.get('/marty/login', pageGenerator(_.template(templateMarty)))
  router.get('/marty/signup', pageGenerator(_.template(templateMarty)))
}

module.exports = {
  load: load
, setup: setup
}


