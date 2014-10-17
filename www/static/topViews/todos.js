define([
  "backbone"
, "text!./templates/todos.html"
, "text!./templates/item.html"
, "text!./templates/stats.html"
, "text!./templates/replicationItem.html"
, "text!./templates/syncStats.html"
, "models/setupPouch"
], function(
  Backbone
, template
, itemTemplate
, statsTemplate
, replicationItemTemplate
, syncStatsTemplate
, pouch
) {

  var View = Backbone.Marionette.ItemView.extend({

    template: _.template(template)

  , initialize: function() {
    }

  })

  return View

})
