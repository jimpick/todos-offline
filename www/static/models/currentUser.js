define([
  "backbone"
], function(
  Backbone
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
  , analyticsIdentify: function() {
      // FIXME
    }
  })

  var currentUser = new CurrentUser()

  return currentUser

})

