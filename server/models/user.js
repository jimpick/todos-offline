var cloudant = require('../lib/cloudant')
var uuid = require('node-uuid')
var bcrypt = require('bcrypt')
var thunkify = require('thunkify')
var genSalt = thunkify(bcrypt.genSalt)
var hash = thunkify(bcrypt.hash)
var compare = thunkify(bcrypt.compare)

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
  args.email = args.email.toLowerCase().trim()

  // Check to see if the user already exists
  var user = yield findByEmail(args.email)
  if (user) throw new Error('Email already exists')

  // Generate an API Key
  var genApiKeyResult = yield cloudant.generateApiKey()

  // Insert the new user record
  var id = uuid.v4()
  var salt = yield genSalt(10)
  args.password = yield hash(args.password, salt)
  args.apiKey = genApiKeyResult.key
  args.apiPassword = genApiKeyResult.password
  yield cloudant.users().insert(args, id)

  // Create the per-user database
  yield cloudant.createDatabaseForUser(id, args)

  user = {
    _id: id
  , email: args.email
  , apiKey: args.apiKey
  , apiPassword: args.apiPassword
  }
  return user
}

function *findByEmail(email) {
  email = email.toLowerCase().trim()
  var result = yield cloudant.users().find({
    selector: {
      email: email
    }
  })
  return result[0].docs[0]
}

function *findById(id) {
  var result = yield cloudant.users().get(id)
  return result[0]
}

function *login(email, password) {
  email = email.toLowerCase().trim()
  console.log('Login', email)
  var user = yield findByEmail(email)
  if (!user) throw new Error('User email not found')
  var matched = yield compare(password, user.password)
  if (!matched) {
    throw new Error('Wrong password')
  }
  return user
}

module.exports = {
  setup: setup
, register: register
, findByEmail: findByEmail
, findById: findById
, login: login
}
