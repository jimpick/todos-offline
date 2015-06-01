var React = require('react')
var Marty = require('marty')
var ApplicationContainer = Marty.ApplicationContainer
var Application = require('./application')
var instances = require('./instances')

var app = new Application()

instances.app = app

window.React = React // For React Developer Tools
window.Marty = Marty // For Marty Developer Tools

if (Marty.isBrowser) {
  app.pouchDbSync.open()
}

app.router.run(function (Root, state) {
  React.render(
    <ApplicationContainer app={app}>
      <Root {...state.params} />
    </ApplicationContainer>
  , document.getElementById('todoapp')
  )
})

