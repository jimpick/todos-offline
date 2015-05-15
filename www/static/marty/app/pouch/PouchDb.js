var PouchDB = require('pouchdb')

if (! window.globalOpts ||
    ! window.globalOpts.user ||
    ! window.globalOpts.user._id) {
  location.href = '/'
}

var dbName = 'todos-' + window.globalOpts.user._id
var db = new PouchDB(dbName)

module.exports = {
  db: db
}

