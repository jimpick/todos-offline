var Marty = require('marty');
var PouchDbStateSource = require('./pouchDbStateSource');
// var PouchActionCreators = require('../actions/pouchActionCreators');

var PouchDbSync = Marty.createStateSource({
  id: 'PouchDbSync',
  mixins: [PouchDbStateSource()],
  events: {
    'updatedOrInserted': 'onUpdatedOrInserted',
    'deleted': 'onDeleted'
  },
  onUpdatedOrInserted: function (doc) {
    console.log('Jim onUpdatedOrInserted', doc)
    // pouchActionCreators.updatedOrInserted(doc);
  },
  onDeleted: function (id) {
    console.log('Jim onDeleted', id)
    // pouchActionCreators.deleted(id);
  }
});

module.exports = PouchDbSync;

