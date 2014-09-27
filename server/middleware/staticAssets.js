var path = require('path')
  , staticCache = require('koa-static-cache')
  , app = require('../app')
  , staticDir = path.join(__dirname, '../../www/static')

app.use(staticCache(staticDir, {
  prefix: '/static/'
, maxAge: 365 * 24 * 60 * 60
}))

