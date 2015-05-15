var session = require('koa-generic-session')
var redisStore = require('koa-redis')

var app = require('../app')
var redisClient = require('../lib/redisClient')

app.keys = ['DevilsElbow']

app.use(session({
  key: 'todomvc.sid'
, store: redisStore({ client: redisClient })
, cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365   // 1 year
  }
}))
