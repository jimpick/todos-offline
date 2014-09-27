var path = require('path')
  , fs = require('fs')
  , http = require('http')
  , koa = require('koa')
  , thunkify = require('thunkify')
  , staticCache = require('koa-static-cache')
  , _ = require('underscore')
  , app = koa()
  , read = thunkify(fs.readFile)
  , wwwDir = path.join(__dirname, '../www')
  , staticDir = path.join(wwwDir, 'static')

app.use(staticCache(staticDir, {
  prefix: '/static/'
, maxAge: 365 * 24 * 60 * 60
}))


app.use(function *welcome(next) {
  // FIXME if (this.request.path != '/') return yield next

  var template = yield read(path.join(wwwDir, 'index.html'), 'utf8')
  this.type = 'html'
  this.body = _.template(template)({
    config: {
      canonicalUrl: 'localhost'
    }
  , staticBase: '/static'
  })
})

var server = http.createServer(app.callback())
  , port = process.env.PORT || 4126

server.listen(port)

console.log('Listening on port ' + port)

