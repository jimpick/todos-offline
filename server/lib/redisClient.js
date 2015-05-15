var url = require('url')
var redis = require('redis')

var config = require('../config')
var log = require('./log')

var redisUrl

if (config.redis) {
  redisUrl = config.redis
}

if (process.env.REDISTOGO_URL) {
  redisUrl = process.env.REDISTOGO_URL
}

if (process.env.REDISCLOUD_URL) {
  redisUrl = process.env.REDISCLOUD_URL
}

if (! redisUrl) {
  log.error('Redis not configured')
  process.exit(1)
}

var rtg = url.parse(redisUrl)
var clientOptions = {}
if (rtg.auth) {
  clientOptions.auth_pass = rtg.auth.split(':')[1]
}
var redisClient = redis.createClient(rtg.port, rtg.hostname, clientOptions)

module.exports = redisClient

