var app = require('../app')

// authentication
require('../lib/auth')
var passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

