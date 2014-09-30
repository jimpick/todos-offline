var Router = require('koa-router')
var mount = require('koa-mount')
var passport = require('koa-passport')
var app = require('../app')
var models = require('../models')

var api = new Router()

api.post('/login', function *login(next) {
  var ctx = this
  // FIXME: Copied from elsewhere - needs review
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

api.post('/register', function *register(next) {
  // FIXME: Validations
  try {
    yield models.user.register(this.request.body)
  } catch(ex) {
    if (ex.message === "Email already exists") {
      console.log(ex.message)
      this.status = 409
      this.body = {
        success: false
      , message: ex.message
      }
      return
    }
    throw ex
  }
  this.status = 201
  this.body = { success: true }
})

app.use(mount('/api/v1', api.middleware()))

