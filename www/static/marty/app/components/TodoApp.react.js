var React = require('react')
var Marty = require('marty')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var Header = require('./Header.react')
var LoginStore = require('../stores/LoginStore')

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

module.exports = Marty.createContainer(TodoApp, {
  listenTo: LoginStore
/* , fetch: {
    allTodos() {
      return TodoStore.for(this).getAll()
    },
    areAllComplete() {
      return TodoStore.areAllComplete() // FIXME?
    }
  } */
})

