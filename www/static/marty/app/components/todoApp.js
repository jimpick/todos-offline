var React = require('react')
var Marty = require('marty')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler

var TodoApp = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler/>
      </div>
    )
  }
})

module.exports = TodoApp

module.exports = Marty.createContainer(TodoApp, {
  listenTo: 'loginStore'
/* , fetch: {
    allTodos() {
      return TodoStore.for(this).getAll()
    },
    areAllComplete() {
      return TodoStore.areAllComplete() // FIXME?
    }
  } */
})

