var Marty = require('marty')
var LoginConstants = require('../constants/LoginConstants')

var LoginActions = Marty.createActionCreators({
  id: 'LoginActions'

, login: function (jwt) {
    this.dispatch(LoginConstants.LOGIN, jwt)
  }

, logout: function () {
    this.dispatch(LoginConstants.LOGOUT)
  }

})

module.exports = LoginActions

