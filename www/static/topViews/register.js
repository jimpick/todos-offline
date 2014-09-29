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
        , email = this.$("#signup-email").val()
        , password = this.$("#signup-password").val()

      e.stopPropagation() // FIXME: Remove form tag
      e.preventDefault()

      currentUser.register(
        email
      , password
      , {
          success: function() {
            app.vent.trigger('go:home')
          }
        , error: function(error) {
            self.$(".signup-form .error")
              .html("Invalid email or password. Please try again.")
              .show()
            self.$(".signup-form button").removeAttr("disabled")
          }
        }
      )

      this.$(".signup-form button").attr("disabled", "disabled")

      return false
    }

  })

  return View

})

