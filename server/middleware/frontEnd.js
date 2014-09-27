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
  var compiledTemplate = _.template(template)({
    staticBase: '/static'
  })
  app.use(function *welcome(next) {
    // FIXME if (this.request.path != '/') return yield next
    this.type = 'html'
    this.body = compiledTemplate
  })
}

module.exports = {
  load: load
, setup: setup
}


