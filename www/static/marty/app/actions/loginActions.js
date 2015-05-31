var Marty = require('marty')
var LoginConstants = require('../constants/LoginConstants')

var LoginActions = Marty.createActionCreators({
  id: 'LoginActions'

, login: function (email, password) {
    this.dispatch(LoginConstants.LOGIN, email, password)
  }

, logout: function () {
    this.dispatch(LoginConstants.LOGOUT)
  }

})

module.exports = LoginActions

