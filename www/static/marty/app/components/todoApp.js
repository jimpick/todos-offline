var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var instances = require('../instances')

var TodoApp = React.createClass({

  statics: {
    willTransitionTo: function (transition) {
      if (
        !transition.path.match(/^\/marty\/login/) &&
        !instances.app.loginStore.getLoggedIn()
      ) {
        transition.redirect('login', {}, {'nextPath' : transition.path});
      }
    }
  }

, render: function() {
    return (
      <div>
        <RouteHandler/>
      </div>
    )
  }
})

module.exports = TodoApp

