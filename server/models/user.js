var cloudant = require('../lib/cloudant')
var uuid = require('node-uuid')
var bcrypt = require('bcrypt')
var thunkify = require('thunkify')
var genSalt = thunkify(bcrypt.genSalt)
var hash = thunkify(bcrypt.hash)

function *register(args) {
  console.log('Register', args)
  var id = uuid.v4()
  var salt = yield genSalt(10)
  args.password = yield hash(args.password, salt)
  yield cloudant.users().insert(args, id)
}

module.exports = {
  register: register
}
