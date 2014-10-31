var cloudant = require('../lib/cloudant')
var uuid = require('node-uuid')
var bcrypt = require('bcrypt')
var thunkify = require('thunkify')
var genSalt = thunkify(bcrypt.genSalt)
var hash = thunkify(bcrypt.hash)
var compare = thunkify(bcrypt.compare)
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
  args.email = args.email.toLowerCase().trim()
  // console.log('Register', args)
  var user = yield findByEmail(args.email)
  if (user) throw new Error('Email already exists')
  var id = uuid.v4()
  var salt = yield genSalt(10)
  args.password = yield hash(args.password, salt)
  insertResult = yield cloudant.users().insert(args, id)
  user = {
    _id: id
  , email: args.email
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
  // console.log('Login', email, password)
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
