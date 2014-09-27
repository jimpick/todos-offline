define([
  "backbone"
, "parse"
], function(
  Backbone
, Parse
) {

  var CurrentUser = Backbone.Model.extend({
    initialize: function() {
      this.analyticsIdentify()
    }
  , isLoggedIn: function() {
      // FIXME
      return false
    }
  , logout: function() {
      // FIXME
      this.analyticsIdentify()
    }
  })

  var currentUser = new CurrentUser()

  return currentUser

})

