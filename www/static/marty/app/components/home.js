var React = require('react')
var Marty = require('marty')
var Footer = require('./footer')
var MainSection = require('./mainSection')

var Home = React.createClass({
  render: function() {
    return (
      <div>
        <MainSection
          allTodos={this.props.allTodos}
          areAllComplete={this.props.areAllComplete}
        />
        <Footer allTodos={this.props.allTodos} />
      </div>
    )
  }
})

module.exports = Marty.createContainer(Home, {
  listenTo: 'todoStore'
, fetch: {
    allTodos() {
      return this.app.todoStore.getAll()
    }
  , areAllComplete() {
      return this.app.todoStore.areAllComplete() // FIXME?
    }
  }
})

