define([
  'underscore'
], function(
  _
) {

  var bindings = {}

  var Binding = function(args) {
    this.name = args.name
    this.route = args.route
    if (args.secondary)
      this.secondary = args.secondary
    this.message = args.message
    _.bindAll(this, 'url')
  }
  _.extend(
    Binding.prototype
  , {
      argNames: function() {
        var result = _.filter(this.route.split('/'), function(argName) {
          return argName[0] == ':'
        })
        return _.map(result, function(argName) {
          return argName.substr(1)
        })
      }
    , getArgs: function() {
        var args = {}
          , binding = this
        _.each(arguments, function(value, index) {
          args[binding.argNames()[index]] = value
        })
        return args
      }
    , url: function(args) {
        return _.map(this.route.split('/'), function(component) {
          if (component[0] != ':')
            return component
          else
            return args[component.substr(1)]
        }).join('/')
      }
    }
  )

  function genBinding(args) {
    bindings[args.name] = new Binding({
      name: args.name
    , route: args.route != undefined ? args.route : args.name
    , message: args.message ? args.message : 'go:' + args.name
    , secondary: args.secondary
    })
    if (args.getArgs)
      bindings[args.name].getArgs = args.getArgs
    if (args.url)
      bindings[args.name].url = args.url
    if (args.backboneRoute)
      bindings[args.name].backboneRoute = args.backboneRoute
  }

  genBinding({name: 'home', route: ''})
  genBinding({name: 'welcome', route: '', secondary: true})
  genBinding({name: 'login'})
  genBinding({name: 'logout'})
  genBinding({name: 'register'})
  genBinding({name: 'congratulations'})
  genBinding({name: 'forgotPassword', route: 'forgot-password'})

  genBinding({name: 'activities'})

  return {
    bindings: bindings
  , traverseBindings: function(cb) {
      _.each(this.bindings, cb)
    }
  , getAllRoutes: function() {
      var primaryRoutes = _.reject(bindings, function(binding) {
        return binding.secondary
      })
      return _.map(primaryRoutes, function(binding) { return binding.route })
    }
  }

})


