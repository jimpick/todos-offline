var React = require('react')
var Marty = require('marty')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var Header = require('./Header.react')
// var TodoStore = require('../stores/TodoStore')

var TodoApp = React.createClass({
  render: function() {
  	return (
      <div>
        <Header />
        <RouteHandler/>
      </div>
    )
  }
})

module.exports = TodoApp

//module.exports = Marty.createContainer(Home, {
  /* listenTo: TodoStore,
  fetch: {
    allTodos() {
      return TodoStore.for(this).getAll()
    },
    areAllComplete() {
      return TodoStore.areAllComplete() // FIXME?
    }
  } */
// })

