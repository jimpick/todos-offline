define([
  "backbone"
, "text!./templates/forgotPassword.html"
, "text!./templates/passwordResetEmailSent.html"
, "app"
], function(
  Backbone
, template
, templateSent
, app
) {

  var View = Backbone.Marionette.ItemView.extend({

    tagName: 'article'

  , attributes: {
      id: 'forgot-password-view'
    , 'class': 'view contentPanel'
    }

  , template: _.template(template)

  , initialize: function() {
      _.bindAll(this , 'forgotPassword')
    }

  , events: {
      "submit form.forgot-password-form": "forgotPassword"
    }

  , forgotPassword: function(e) {
      var self = this
        , email = this.$("#forgot-password-email").val()

      e.stopPropagation() // FIXME: Remove form tag
      e.preventDefault()

      Parse.User.requestPasswordReset(
        email
      , {
          success: function(user) {
            self.template = _.template(templateSent)
            self.render()
          }
        , error: function(user, error) {
            self.$(".forgot-password-form .error")
              .html("Invalid email. Please try again.")
              .show()
            self.$(".forgot-password-form button").removeAttr("disabled")
          }
        }
      )

      this.$(".forgot-password-form button").attr("disabled", "disabled")

      return false
    }
  })

  return View

})

