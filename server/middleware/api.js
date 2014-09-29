var Router = require('koa-router')
var mount = require('koa-mount')
var passport = require('koa-passport')
var app = require('../app')

var api = new Router()

api.post('/login', function *login(next) {
  var ctx = this
  yield* passport.authenticate('local', function*(err, user, info) {
    if (err) throw err
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
    } else {
      yield ctx.login(user)
      ctx.body = { success: true }
    }
  }).call(this, next)
})

api.post('/logout', function *logout(next) {
  this.logout()
  ctx.body = { success: true }
})

app.use(mount('/api/v1', api.middleware()))

