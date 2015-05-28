var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

module.exports = [
  /* <Route name="room"
         path="/rooms/:id"
         handler={require('./components/room')} />, */
  <Route name="home"
         path="/marty"
         handler={require('./components/TodoApp.react')} />
];
