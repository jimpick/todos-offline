var PouchDB = require('pouchdb')

if (window.globalOpts &&
    window.globalOpts.user &&
    window.globalOpts.user._id) {

  var dbName = 'todos-' + window.globalOpts.user._id
  var db = new PouchDB(dbName)

  // Replication
  //  - store in object so we can cancel them
  var replications = {
    to: null
  , from: null
  }

  var remoteUrl = 'https://' +
    window.globalOpts.user.apiKey + ':' +
    window.globalOpts.user.apiPassword + '@' +
    window.globalOpts.cloudant.account + '.cloudant.com/' +
    encodeURIComponent(window.globalOpts.cloudant.db + '/users/' +
                       window.globalOpts.user._id)

  function backOff (delay) {
    return 1000
  }

  replications.to = db.replicate.to(remoteUrl, {
    live: true
  , retry: true
  , back_off_function: backOff
  })
  .on('error', function(err) {
    console.log('Replication error (to remote)', err)
  })

  replications.from = db.replicate.from(remoteUrl, {
    live: true
  , retry: true
  , back_off_function: backOff
  })
  .on('error', function(err) {
    console.log('Replication error (from remote)', err)
  })

  // FIXME: This will keep replicating even after the user logs out
  // It would be nice if the replication stopped when the user logs
  // out to conserve resources.

} else {
  // location.href = '/'
  var dbName = 'todos-anonymous' // FIXME
  var db = new PouchDB(dbName)
}

module.exports = {
  db: db
, replications: replications
}

