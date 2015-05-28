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
    return {};
  }

, login: function () {
    console.log('Jim login')
  }

, logout: function () {
    console.log('Jim logout')
  }

})

module.exports = LoginStore

