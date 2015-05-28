var React = require('react')
var Router = require('react-router')
var Route = Router.Route
var TodoApp = require('./components/TodoApp.react')
var Home = require('./components/Home.react')

module.exports = [
  <Route handler={TodoApp}>
    <Route name="home" path="/marty" handler={Home} />
  </Route>
]
