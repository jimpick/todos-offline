var path = require('path')
var staticCache = require('koa-static-cache')
var app = require('../app')
var staticDir = path.join(__dirname, '../../www/static')

app.use(staticCache(staticDir, {
  prefix: '/static/'
, maxAge: 365 * 24 * 60 * 60
}))

