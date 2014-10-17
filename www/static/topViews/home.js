define([
  "backbone"
, "text!./templates/home.html"
, "models/currentUser"
, "./sync"
, "./todos"
], function(
  Backbone
, template
, currentUser
, SyncView
, TodosView
) {

  var View = Backbone.Marionette.Layout.extend({

    template: _.template(template)

  , initialize: function() {
    }

  , regions: {
      syncRegion: ".syncRegion"
    , todosRegion: ".todosRegion"
    }

  , serializeData: function() {
      return {
        currentUser: currentUser
      }
    }

  , onDomRefresh: function() {
      this.syncRegion.show(new SyncView({}))
      this.todosRegion.show(new TodosView({}))
    }

  , events: {
    }

  })

  return View

})

