var React = require('react')
var Marty = require('marty')

var Login = React.createClass({
  render: function() {
    return (
      <h1>
        Login
      </h1>
    )
  }
})

module.exports = Marty.createContainer(Login)

