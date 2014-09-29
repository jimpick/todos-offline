var path = require('path')
var fs = require('fs')
var _ = require('underscore')
var configFile = path.join(__dirname, '../config.js')

// Read configuration from config.js file at top level first (for devs)
// and then from environment variables (for Heroku deploy)

config = {
  cloudant: {}
}

if (fs.existsSync(configFile)) {
  var configFromFile = require(configFile)
  _.extend(config, configFromFile)
}

if (process.env.CLOUDANT_USERNAME) {
  config.cloudant.username = process.env.CLOUDANT_USERNAME
}

if (process.env.CLOUDANT_PASSWORD) {
  config.cloudant.password = process.env.CLOUDANT_PASSWORD
}

if (process.env.CLOUDANT_DB) {
  config.cloudant.db = process.env.CLOUDANT_DB
}

_.defaults(config.cloudant, {db: 'onepass'})

// Validations

function abort(message) {
  console.log('Aborting: ', message)
  process.exit(1)
}

if (!config.cloudant.username) {
  abort('Cloudant username required')
}

if (!config.cloudant.password) {
  abort('Cloudant password required')
}

if (!config.cloudant.db) {
  abort('Cloudant db required')
}

module.exports = config
