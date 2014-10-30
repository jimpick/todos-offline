define([
  "backbone"
, "text!./templates/home.html"
, "models/currentUser"
, "./todos"
], function(
  Backbone
, template
, currentUser
, TodosView
) {

  var View = Backbone.Marionette.Layout.extend({

    template: _.template(template)

  , initialize: function() {
    }

  , regions: {
      todosRegion: ".todosRegion"
    }

  , serializeData: function() {
      return {
        currentUser: currentUser
      }
    }

  , onDomRefresh: function() {
      this.todosRegion.show(new TodosView({}))
    }

  , events: {
    }

  })

  return View

})

