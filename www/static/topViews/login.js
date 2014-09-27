define([
  "backbone"
, "text!./templates/login.html"
, "app"
, "models/currentUser"
], function(
  Backbone
, template
, app
, currentUser
) {

  var View = Backbone.Marionette.ItemView.extend({

    tagName: 'article'

  , attributes: {
      id: 'login-view'
    , 'class': 'view contentPanel'
    }

  , template: _.template(template)

  , initialize: function() {
      _.bindAll(this , 'login')
    }

  , events: {
      "submit form.login-form": "login"
    }

  , login: function(e) {
      var self = this
        , username = this.$("#login-username").val()
        , password = this.$("#login-password").val()

      e.stopPropagation() // FIXME: Remove form tag
      e.preventDefault()

      /* Parse.User.logIn(
        username
      , password
      , {
          success: function(user) {
            currentUser.updateParseUser(user)
            app.vent.trigger('go:home')
          }
        , error: function(user, error) {
            self.$(".login-form .error")
              .html("Invalid username or password. Please try again.")
              .show()
            self.$(".login-form button").removeAttr("disabled")
          }
        }
      )

      this.$(".login-form button").attr("disabled", "disabled")
      */

      return false
    }
  })

  return View

})

