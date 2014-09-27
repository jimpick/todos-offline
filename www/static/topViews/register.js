define([
  "backbone"
, "text!./templates/register.html"
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
      id: 'register-view'
    , 'class': 'view contentPanel'
    }

  , template: _.template(template)

  , initialize: function() {
      _.bindAll(this , 'signUp')
    }

  , events: {
      "submit form.signup-form": "signUp"
    }

  , signUp: function(e) {
      var self = this
        , username = this.$("#signup-username").val()
        , password = this.$("#signup-password").val()

      e.stopPropagation() // FIXME: Remove form tag
      e.preventDefault()

      /*
      var user = new Parse.User()
      user.set('username', username)
      user.set('email', username)
      user.set('password', password)
      user.signUp(
        null
      , {
          success: function(user) {
            currentUser.updateParseUser(user)
            app.vent.trigger('go:home')
          }
        , error: function(user, error) {
            self.$(".signup-form .error").html(error.message).show()
            self.$(".signup-form button").removeAttr("disabled")
          }
        }
      )

      this.$(".signup-form button").attr("disabled", "disabled")
      */

      return false
    }

  })

  return View

})

