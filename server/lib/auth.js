var passport = require('koa-passport')
var co = require('co')
var models = require('../models')

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(id, done) {
  co(function *getUser() {
    try {
      var user = yield models.user.findById(id)
      done(null, user)
    } catch (ex) {
      console.log('User lookup error', ex)
      return done(null, false)
    }
  }).catch(function (err) {
    console.log('Unknown deserialize error', err)
    return done(err)
  })
})

var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  }
, function localLogin(email, password, done) {
    co(function *loginFromLocal() {
      try {
        var user = yield models.user.login(email, password)
        return done(null, user)
      } catch (ex) {
        console.log('Login error', ex)
        return done(null, false)
      }
    }).catch(function (err) {
      console.log('Unknown login error', err)
      return done(err)
    })
  }
))

