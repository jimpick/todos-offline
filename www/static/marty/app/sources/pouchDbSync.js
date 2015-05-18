var Marty = require('marty');
var PouchDbStateSource = require('./pouchDbStateSource');
var TodoActions = require('../actions/TodoActions');

var PouchDbSync = Marty.createStateSource({
  id: 'PouchDbSync',
  mixins: [PouchDbStateSource()],
  events: {
    'updatedOrInserted': 'onUpdatedOrInserted',
    'deleted': 'onDeleted'
  },
  onUpdatedOrInserted: function (doc) {
    TodoActions.updatedOrInserted(doc);
  },
  onDeleted: function (id) {
    TodoActions.deleted(id);
  }
});

module.exports = PouchDbSync;

