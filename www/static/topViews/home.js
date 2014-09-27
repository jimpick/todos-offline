define([
  "backbone"
, "text!./templates/home.html"
, "models/currentUser"
], function(
  Backbone
, template
, currentUser
) {

  var View = Backbone.Marionette.ItemView.extend({

    tagName: 'article'

  , attributes: {
      id: 'main-view'
    , 'class': 'view contentPanel'
    }

  , template: _.template(template)

  , initialize: function() {
    }

  , serializeData: function() {
      return {
        currentUser: currentUser
      }
    }

  , onDomRefresh: function() {
    }

  , events: {
    }

  })

  return View

})

