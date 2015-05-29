var React = require('react')
var Router = require('react-router')
var Route = Router.Route
var TodoApp = require('./components/todoApp')
var Home = require('./components/home')

module.exports = [
  <Route handler={TodoApp}>
    <Route name="home" path="/marty" handler={Home} />
  </Route>
]
