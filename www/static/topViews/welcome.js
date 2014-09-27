define([
  "backbone"
, "text!./templates/welcome.html"
], function(
  Backbone
, template
) {

  var View = Backbone.Marionette.ItemView.extend({

    tagName: 'article'

  , attributes: {
      id: 'welcome-view'
    , 'class': 'view contentPanel'
    }

  , template: _.template(template)

  })

  return View

})

