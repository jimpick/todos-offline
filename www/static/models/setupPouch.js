define([
  "backbone"
, "pouchdb"
, "backbone-pouch"
], function(
  Backbone
, PouchDB
, BackbonePouch
) {

  function setup(currentUser) {
    if (!currentUser.isLoggedIn())
      return

    var dbName = 'todos-' + currentUser.id
    var db = new PouchDB(dbName)

    // Save all of the todo items in the `"todos-backbone"` database.
    Backbone.sync = BackbonePouch.sync({
      // We currently suffix by the PouchDB version here
      // because at the moment PouchDB does not support upgrade
      db: db
    , listen: true
    , fetch: 'query'
    })

    // Replication
    var remoteUrl = globalOpts.cloudantUrl +
      encodeURIComponent('/users/' + currentUser.id)
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
  }

  return {
    setup: setup
  }
})
