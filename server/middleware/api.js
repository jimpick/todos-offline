var Router = require('koa-router')
  , mount = require('koa-mount')
  , passport = require('koa-passport')
  , app = require('../app')

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

app.use(mount('/api/v1', api.middleware()))

