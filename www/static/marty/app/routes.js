var React = require('react')
var Router = require('react-router')
var Route = Router.Route
var TodoApp = require('./components/todoApp')
var Login = require('./components/login')
var Signup = require('./components/signup')
var Home = require('./components/home')

module.exports = [
  <Route handler={TodoApp}>
    <Route name="login" path="/marty/login" handler={Login} />
    <Route name="signup" path="/marty/signup" handler={Signup} />
    <Route name="home" path="/marty" handler={Home} />
  </Route>
]
