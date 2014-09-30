var cloudant = require('../lib/cloudant')
var uuid = require('node-uuid')
var bcrypt = require('bcrypt')
var thunkify = require('thunkify')
var genSalt = thunkify(bcrypt.genSalt)
var hash = thunkify(bcrypt.hash)
var cloudant = require('../lib/cloudant')

function *setup() {
  yield cloudant.users().index({
    name: 'email'
  , type: 'json'
  , index: {
      fields: ['email']
    }
  })
}

function *register(args) {
  console.log('Register', args)
  var user = yield findByEmail(args.email)
  if (user) throw new Error('Email already exists')
  var id = uuid.v4()
  var salt = yield genSalt(10)
  args.password = yield hash(args.password, salt)
  yield cloudant.users().insert(args, id)
}

function *findByEmail(email) {
  var result = yield cloudant.users().find({
    selector: {
      email: email
    }
  })
  var finalResult = result[0].docs[0]
  return finalResult
}

module.exports = {
  setup: setup
, register: register
, findByEmail: findByEmail
}
