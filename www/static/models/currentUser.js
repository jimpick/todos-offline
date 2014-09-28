define([
  "backbone"
], function(
  Backbone
) {

  var CurrentUser = Backbone.Model.extend({
    initialize: function() {
    }
  , isLoggedIn: function() {
      // FIXME
      return false
    }
  , login: function(username, password, opts) {
      $.post('/api/v1/login', {
        username: username
      , password: password
      })
      .done(function() {
        opts.success()
      })
      .fail(function() {
        opts.error()
      })
    }
  , logout: function() {
      // FIXME
    }
  })

  var currentUser = new CurrentUser()

  return currentUser

})

