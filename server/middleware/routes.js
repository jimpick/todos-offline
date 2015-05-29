var app = require('../app')
var router = require('../lib/router')

app
.use(router.routes())
.use(router.allowedMethods())

