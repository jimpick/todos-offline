var passport = require('koa-passport')

var user = { id: 1, email: 'test@example.com' }

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, user)
})

var LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  }
, function(email, password, done) {
    // retrieve user ...
    if (email === 'test@example.com' && password === 'test') {
      done(null, user)
    } else {
      done(null, false)
    }
  }
))

