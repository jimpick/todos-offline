define([
  "backbone"
, "text!./templates/sync.html"
], function(
  Backbone
, template
) {

  var View = Backbone.Marionette.ItemView.extend({

    template: _.template(template)

  , initialize: function() {
    }

  })

  return View

})
