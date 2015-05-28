var React = require('react')
var Marty = require('marty')
var Footer = require('./Footer.react')
var MainSection = require('./MainSection.react')
var TodoStore = require('../stores/TodoStore')

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
  listenTo: TodoStore,
  fetch: {
    allTodos() {
      return TodoStore.for(this).getAll()
    },
    areAllComplete() {
      return TodoStore.areAllComplete() // FIXME?
    }
  }
})

