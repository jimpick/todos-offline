var PouchDB = require('pouchdb')

if (! window.globalOpts ||
    ! window.globalOpts.user ||
    ! window.globalOpts.user._id) {
  location.href = '/'
}

var dbName = 'todos-' + window.globalOpts.user._id
var db = new PouchDB(dbName)

// Replication
var remoteUrl = 'https://' +
  window.globalOpts.user.apiKey + ':' +
  window.globalOpts.user.apiPassword + '@' +
  window.globalOpts.cloudant.account + '.cloudant.com/' +
  encodeURIComponent(window.globalOpts.cloudant.db + '/users/' +
                     window.globalOpts.user._id)

db.replicate.to(remoteUrl, {continuous: true})
.on('error', function(err) {
  console.log('Replication error (to remote)', err)
})
db.replicate.from(remoteUrl, {continuous: true})
.on('error', function(err) {
  console.log('Replication error (from remote)', err)
})

// FIXME: This will keep replicating even after the user logs out
// It would be nice if the replication stopped when the user logs
// out to conserve resources.

module.exports = {
  db: db
}

