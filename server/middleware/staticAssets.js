var path = require('path')
var app = require('../app')
var mount = require('koa-mount')
var staticServer = require('koa-static')

app.use(mount('/static', staticServer(
  path.join(__dirname, '../../www/static')
)))

