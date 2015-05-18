var pouch = require('../pouch/PouchDb')

function pouchDbStateSource() {
  return {
    open: function () {
      var stateSource = this
      pouch.db.changes({
        live: true
      , since: 'now'
      , include_docs: true
      }).on('change', function (change) {
        if (change.deleted) {
          stateSource[stateSource.events.deleted]
          .call(stateSource, change.id)
        } else {
          stateSource[stateSource.events.updatedOrInserted]
          .call(stateSource, change.doc)
        }
      }).on('error', function (err) {
        console.log('pouchDbStateSource error', err)
      })
    }
  }
}

module.exports = pouchDbStateSource

