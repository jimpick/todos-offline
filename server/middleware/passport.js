var app = require('../app')

// sessions
var session = require('koa-generic-session')
app.keys = ['your-session-secret']
app.use(session())

// body parser
var bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// authentication
require('../lib/auth')
var passport = require('koa-passport')
app.use(passport.initialize())
app.use(passport.session())

