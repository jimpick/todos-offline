var co = require('co')
  , Cloudant = require('cloudant')
  , config = require('../config')
  , cloudant = Cloudant({
      account: config.cloudant.username
    , password: config.cloudant.password
    })
  , coCloudant = require('./co-cloudant')(cloudant)

function *listDatabases() {
  var allDbs = (yield coCloudant.db.list())[0]
  console.log('All databases: %s', allDbs.join(', '))    
}

function *createDatabase(dbName) {
  try {
    yield coCloudant.db.create(dbName)
    console.log('Created cloudant db ' + dbName)
  } catch (e) {
    if (!e.status_code === 412) {
      throw e // If database already exists (status_code is 412), then
              // continue, otherwise, rethrow
    }
  }
}

function *createDatabases() {
  yield createDatabase(config.cloudant.db)
  yield createDatabase(config.cloudant.db + '/users')
}

module.exports = {
  listDatabases: listDatabases
, createDatabases: createDatabases
}
