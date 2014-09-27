define([
  "backbone"
, "app"
, "routes"
], function(
  Backbone
, app
, routes
) {

  var History = Backbone.History.extend({
    loadUrl: function() {
      var match = Backbone.History.prototype.loadUrl.apply(this, arguments)
      if (!match && ((globalOpts.pushState && window.history.pushState) || !globalOpts.pushState))
        app.vent.trigger('go:404', {
          fragment: this.fragment
        })
      return match
    }
  })
  Backbone.history = new History()

  var Router = Backbone.Router.extend({
    routes: {}
  })

  var bindings = routes.bindings
  var i = 0
  routes.traverseBindings(function(binding, key) {
    if (binding.secondary) return

    var funcName = "binding" + i++ + "_" + key
    var route = binding.backboneRoute ? binding.backboneRoute : binding.route
    Router.prototype.routes[route] = funcName
    Router.prototype[funcName] = function() {
      var args = binding.getArgs.apply(binding, arguments)
      app.vent.trigger(binding.message, args)
    }

    var redirectFuncName = "binding" + i++ + "_" + key + "_redirect"
    // console.log('Generating Route', key, binding, funcName)
    Router.prototype.routes[route + '/'] = redirectFuncName
    Router.prototype[redirectFuncName] = function() {
      Backbone.history.navigate(
        Backbone.history.getFragment().replace(/\/$/,'')
      , {
          trigger: true
        }
      )
    }
  })

  return Router

})


