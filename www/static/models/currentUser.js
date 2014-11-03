define([
  "backbone"
, "models/setupPouch"
], function(
  Backbone
, setupPouch
) {

  // Adjust id attribute to the one PouchDB uses
  Backbone.Model.prototype.idAttribute = '_id'

  var CurrentUser = Backbone.Model.extend({
    initialize: function() {
      this.set('loggedIn', false)
    }
  , isLoggedIn: function() {
      return this.get('loggedIn')
    }
  , setLoggedIn: function(userData) {
      this.clear()
      if (userData._id) {
        this.id = userData._id
        delete userData._id
        this.set(userData)
        this.set('loggedIn', true)
      } else {
        this.id = undefined
        this.set('loggedIn', false)
      }
      setupPouch.setup(this)
    }
  , login: function(email, password, opts) {
      var model = this
      $.post('/api/v1/login', {
        email: email
      , password: password
      })
      .done(function(data) {
        model.setLoggedIn(data.user)
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
  , register: function(email, password, opts) {
      var model = this
      $.post('/api/v1/register', {
        email: email
      , password: password
      })
      .done(function(data) {
        model.setLoggedIn(data.user)
        opts.success()
      })
      .fail(function(data) {
        var err
        try {
          err = JSON.parse(data.responseText)
        } catch(e) {
          err = {
            message: 'Unknown error'
          }
        }
        opts.error(err)
      })
    }
  })

  var currentUser = new CurrentUser()

  return currentUser

})

