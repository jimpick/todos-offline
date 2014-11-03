define([
  "backbone"
, "text!./templates/404.html"
], function(
  Backbone
, template
) {

  var View = Backbone.Marionette.ItemView.extend({

    tagName: 'article'

  , attributes: {
      id: '404-view'
    , 'class': 'view contentPanel'
    }

  , template: _.template(template)

  })

  return View

})

