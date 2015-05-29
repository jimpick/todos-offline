var Marty = require('marty')
var PouchDbStateSource = require('../lib/pouchDbStateSource')

var PouchDbSync = Marty.createStateSource({
  id: 'PouchDbSync'
, mixins: [PouchDbStateSource()]
, events: {
    'updatedOrInserted': 'onUpdatedOrInserted'
  , 'deleted': 'onDeleted'
  }
, onUpdatedOrInserted: function (doc) {
    this.app.todoActions.updatedOrInserted(doc)
  }
, onDeleted: function (id) {
    this.app.todoActions.deleted(id)
  }
})

module.exports = PouchDbSync

