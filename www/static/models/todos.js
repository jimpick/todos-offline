define([
  "backbone"
, "./setupPouch"
], function(
  Backbone
, setupPouch
) {

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        type: 'todo'
      , title: "empty todo..."
      , order: Todos.nextOrder()
      , done: false
      }
    }

    // Ensure that each todo created has `title`.
  , initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults.title})
      }
    }

    // Toggle the `done` state of this todo item.
  , toggle: function() {
      this.save({done: !this.get("done")})
    }

    // Remove this Todo from *PouchDB* and delete its view.
  , clear: function() {
      this.destroy()
    }

  })

  // Todo Collection
  // ---------------

  // The collection of todos is backed by *PouchDB* instead of a remote
  // server.
  var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo

    // Include todos in Map Reduce response. Order by `order`.
  , pouch: {
      options: {
        query: {
          include_docs: true
        , fun: {
            map: function(doc) {
              if (doc.type === 'todo') {
                emit(doc.order, null)
              }
            }
          }
        }
      , changes: {
          include_docs: true
        , filter: function(doc) {
            return doc._deleted || doc.type === 'todo'
          }
        }
      }
    }

    // parse view result, use doc property injected via `include_docs`
  , parse: function(result) {
      return _.pluck(result.rows, 'doc')
    }

    // Filter down the list of all todo items that are finished.
  , done: function() {
      return this.filter(function(todo){ return todo.get('done') })
    }

    // Filter down the list to only todo items that are still not finished.
  , remaining: function() {
      return this.without.apply(this, this.done())
    }

    // We keep the Todos in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
  , nextOrder: function() {
      if (!this.length) return 1
      return this.last().get('order') + 1
    }

    // Todos are sorted by their original insertion order.
  , comparator: function(todo) {
      return todo.get('order')
    }

  })

  // Create our global collection of **Todos**.
  var todos = new TodoList

  return todos

})

