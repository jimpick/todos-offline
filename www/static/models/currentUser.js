define([
  "backbone"
], function(
  Backbone
) {

  var CurrentUser = Backbone.Model.extend({
    initialize: function() {
      this.set('loggedIn', false)
    }
  , isLoggedIn: function() {
      return this.get('loggedIn')
    }
  , login: function(email, password, opts) {
      var model = this
      $.post('/api/v1/login', {
        email: email
      , password: password
      })
      .done(function() {
        model.clear()
        model.set('loggedIn', true)
        model.set('email', email)
        opts.success()
      })
      .fail(function() {
        opts.error()
      })
    }
  , logout: function() {
      this.set('loggedIn', false)
      $.post('/api/v1/logout') // FIXME: The UI should have some feedback
                               // if the server logout fails, or it should
                               // trash the session
    }
  })

  var currentUser = new CurrentUser()

  return currentUser

})

