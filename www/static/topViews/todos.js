define([
  "backbone"
, "text!./templates/todos.html"
, "text!./templates/stats.html"
, "text!./templates/syncStats.html"
, "models/todos"
, "./todoItem"
], function(
  Backbone
, template
, statsTemplate
, syncStatsTemplate
, todos
, TodoView
) {

  var View = Backbone.Marionette.ItemView.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    // el: $("#todoapp")

    template: _.template(template)
  , statsTemplate: _.template(statsTemplate)

    // At initialization we bind to the relevant events on the `todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *PouchDB*.
  , initialize: function() {
      _.bindAll(
        this
      , 'createOnEnter'
      , 'clearCompleted'
      , 'toggleAllComplete'
      , 'addOne'
      , 'addAll'
      )
      this.listenTo(todos, 'add', this.addOne)
      this.listenTo(todos, 'reset', this.addAll)

      todos.reset()
      todos.fetch()
    }

    // Delegated events for creating new items, and clearing completed ones.
  , events: {
      "keypress #new-todo":  "createOnEnter"
    , "click #clear-completed": "clearCompleted"
    , "click #toggle-all": "toggleAllComplete"
    }

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
  , onDomRefresh: function() {
      if (!this.listening) { // Hacky
        this.listenTo(todos, 'all', this.onDomRefresh)
        this.listening = true
      }
      var done = todos.done().length
      var remaining = todos.remaining().length

      this.input = this.$("#new-todo")
      this.allCheckbox = this.$("#toggle-all")[0]
      this.stats = this.$('#stats')
      this.main = $('#main')

      if (todos.length) {
        this.main.show()
        this.stats.show()
        this.stats.html(this.statsTemplate({done: done, remaining: remaining}))
      } else {
        this.main.hide()
        this.stats.hide()
      }

      this.allCheckbox.checked = !remaining
    }

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
  , addOne: function(todo) {
      var view = new TodoView({model: todo})
      view.render()
      view.onDomRefresh()
      this.$("#todo-list").append(view.el)
      this.main.show()
    }

    // Add all items in the **todos** collection at once.
  , addAll: function() {
      todos.each(this.addOne)
    }

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *PouchDB*.
  , createOnEnter: function(e) {
      if (e.keyCode != 13) return
      if (!this.input.val()) return

      todos.create({title: this.input.val()}, { wait: true })
      this.input.val('')
    }

    // Clear all done todo items, destroying their models.
  , clearCompleted: function() {
      _.each(todos.done(), function(todo) { todo.clear() })
      return false
    }

  , toggleAllComplete: function () {
      var done = this.allCheckbox.checked
      todos.each(function (todo) { todo.save({'done': done}) })
    }

  })

  return View

})
