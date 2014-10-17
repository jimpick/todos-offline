define([
  "backbone"
, "pouchdb"
, "backbone-pouch"
], function(
  Backbone
, PouchDB
, BackbonePouch
) {

  var dbname = 'todos-sync-backbone-0.0.12'

  // Save all of the todo items in the `"todos-backbone"` database.
  Backbone.sync = BackbonePouch.sync({
    // We currently suffix by the PouchDB version here
    // because at the moment PouchDB does not support upgrade
    db: new PouchDB(dbname)
  , listen: true
  , fetch: 'query'
  });

  // Adjust id attribute to the one PouchDB uses
  Backbone.Model.prototype.idAttribute = '_id'

})
