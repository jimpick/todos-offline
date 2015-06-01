var React = require('react/addons')
var Marty = require('marty')
var Router = require('react-router')
var Link = Router.Link

var Login = React.createClass({

  mixins: [React.addons.LinkedStateMixin]

, getInitialState: function () {
    return {
      email: ''
    , password: ''
    }
  }

, componentWillMount: function () {
    this.app.loginStore.addChangeListener((state, store) => {
      this.app.router.transitionTo('home')
    })
  }

, login: function(e) {
    this.app.loginActions.login(
      this.state.email
    , this.state.password
    )
  }

, render: function() {
    return (
      <div>
        <h1>Login</h1>
        <p>Logged In: {this.props.loggedIn}</p>
        <div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text"
                   valueLink={this.linkState('email')}
                   className="form-control"
                   id="email"
                   placeholder="Email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password"
                   valueLink={this.linkState('password')}
                   className="form-control"
                   id="password"
                   ref="password"
                   placeholder="Password" />
          </div>
          <button type="submit"
                  className="btn btn-default"
                  onClick={this.login}>
            Submit
          </button>
        </div>
        <Link to="home">Home</Link>
      </div>
    )
  }
})

module.exports = Marty.createContainer(Login, {
  listenTo: 'loginStore'
, fetch: {
    loggedIn() {
      return this.app.loginStore.getLoggedIn() ? 'true' : 'false'
    }
  }
})


