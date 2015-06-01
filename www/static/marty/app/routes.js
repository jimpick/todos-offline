var React = require('react')
var Router = require('react-router')
var Route = Router.Route
var DefaultRoute = Router.DefaultRoute
var TodoApp = require('./components/todoApp')
var Login = require('./components/login')
var Signup = require('./components/signup')
var Home = require('./components/home')

module.exports = [
  <Route path="/marty" handler={TodoApp}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="login" handler={Login} />
    <Route name="signup" handler={Signup} />
  </Route>
]

