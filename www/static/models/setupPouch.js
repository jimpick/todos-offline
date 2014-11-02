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

    // Save all of the todo items in the `"todos-backbone"` database.
    Backbone.sync = BackbonePouch.sync({
      // We currently suffix by the PouchDB version here
      // because at the moment PouchDB does not support upgrade
      db: new PouchDB(dbName)
    , listen: true
    , fetch: 'query'
    })

    // Replication
    var remoteUrl = 'http://localhost:5984/todos'
    PouchDB.replicate(dbName, remoteUrl, {continuous: true})
    PouchDB.replicate(remoteUrl, dbName, {continuous: true})

    // FIXME: This will keep replicating even after the user logs out
    // It would be nice if the replication stopped when the user logs
    // out to conserve resources.
  }

  return {
    setup: setup
  }
})
