var winston = require('winston')

var config = require('../config')

if (config.devMode) {
  winston.cli()
  winston.level = 'debug'
} else { //FIXME: production should be ...?
  winston.level = 'debug'
}

module.exports = winston

