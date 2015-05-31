var _ = require('lodash')
var Marty = require('marty')
var LoginConstants = require('../constants/LoginConstants')

var LoginStore = Marty.createStore({

  id: 'LoginStore'

, handlers: {
    login: LoginConstants.LOGIN
  , logout: LoginConstants.LOGOUT
  }

, getInitialState: function () {
    return {
      loggedIn: false
    }
  }

, login: function (email, password) {
    console.log('Jim login', email, password)
    this.setState({
      loggedIn: true
    })
  }

, logout: function () {
    console.log('Jim logout')
  }

, getLoggedIn: function () {
    return this.state.loggedIn
  }

})

module.exports = LoginStore

