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

    var dbname = 'todos-' + currentUser.id

    // Save all of the todo items in the `"todos-backbone"` database.
    Backbone.sync = BackbonePouch.sync({
      // We currently suffix by the PouchDB version here
      // because at the moment PouchDB does not support upgrade
      db: new PouchDB(dbname)
    , listen: true
    , fetch: 'query'
    })
  }

  return {
    setup: setup
  }
})
