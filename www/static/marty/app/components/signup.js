var React = require('react')
var Marty = require('marty')

var Signup = React.createClass({
  render: function() {
    return (
      <h1>
        Signup
      </h1>
    )
  }
})

module.exports = Marty.createContainer(Signup)

