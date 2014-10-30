define([
  "backbone"
, "text!./templates/item.html"
], function(
  Backbone
, template
) {

  var View = Backbone.Marionette.ItemView.extend({

    //... is a list tag.
    tagName:  "li"

  , template: _.template(template)

    // The TodoView listens for changes to its model, re-rendering. Since
    // there's a one-to-one correspondence between a **Todo** and a
    // **TodoView** in this app, we set a direct reference on the model
    // for convenience.

  , initialize: function() {
      _.bindAll(
        this
      , 'toggleDone'
      , 'edit'
      , 'clear'
      , 'updateOnEnter'
      , 'save'
      )
      this.listenTo(this.model, 'change', this.onDomRefresh)
      this.listenTo(this.model, 'destroy', this.remove)
    }

    // The DOM events specific to an item.
  , events: {
      "click .toggle": "toggleDone"
    , "dblclick .view": "edit"
    , "click a.destroy": "clear"
    , "keypress .edit": "updateOnEnter"
    , "blur .edit": "save"
    }

    // Re-render the titles of the todo item.
  , onDomRefresh: function() {
      this.$el.toggleClass('done', this.model.get('done'))
      this.$el.toggleClass('conflicts',
        _.size(this.model.get('_conflicts')) > 0)
      this.input = this.$('.edit')
    }

    // Toggle the `"done"` state of the model.
  , toggleDone: function() {
      this.model.toggle()
    }

    // Switch this view into `"editing"` mode, displaying the input field.
  , edit: function() {
      this.$el.addClass("editing")
      this.input = this.$('.edit')
      this.input.focus()
    }

    // Close the `"editing"` mode, saving changes to the todo.
  , save: function() {
      var value = this.input.val()
      if (!value) this.clear()
      this.model.save({title: value})
      this.$el.removeClass("editing")
    }

    // If you hit `enter`, we're through editing the item.
  , updateOnEnter: function(e) {
      if (e.keyCode == 13) this.save()
    }

    // Remove the item, destroy the model.
  , clear: function() {
      this.model.clear()
    }
  })

  return View

})
