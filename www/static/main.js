require([
  "require"
, "app"
, "vendor/backblend/router"
, "routes"
, "models/currentUser"
],

function(
  require
, app
, Router
, routes
, currentUser
) {

  var router = new Router()
    , bindings = routes.bindings

  function track(message, args) {
    if (args)
      console.log(message, args)
    else
      console.log(message)
    if (typeof analytics != 'undefined' && analytics) {
      var props = args ? _.clone(args) : {}
      analytics.track(message, props)
    }
  }

  function forcePageReload(url) {
    Backbone.history.stop()
    window.location = url
    if (globalOpts.pushState) {
      if (window.history.replaceState) {
        window.history.replaceState(null, null, url)
        window.location.reload(true)
      }
    }
  }

  function showView(name, forceRender, options, cb) {
    require([name], function(View) {
      if (app.mainRegion.currentView instanceof View) {
        app.mainRegion.currentView.options = options
        if (forceRender)
          app.mainRegion.currentView.render()
        return cb && cb(app.mainRegion.currentView)
      }
      var view = new View(options)
      app.mainRegion.show(view)
      cb && cb(view)
    })
  }

  function navigateAndShowView(binding, options, args) {
    var path = '/' + binding.url(args)
    if (location.pathname != path)
      router.navigate(path)
    document.title = '1pass-offline'
      + (binding.url(args) == '' ? '' : ': ' + binding.url(args))
    showView(options.view, options.forceRender, args, function(view) {
      if (options.layoutTrigger)
        view.vent.trigger(options.layoutTrigger, args)
    })
  }

  function onGo(binding, inputOptions) {
    var options = _.clone(inputOptions)
    app.vent.on(binding.message, function(args) {
      track(binding.message, args)
      if (!options.unAuthOk && !currentUser.isLoggedIn())
        return app.vent.trigger(bindings.welcome.message)
      if (options.before) {
        options.before(args, options, function(bypass) {
          if (bypass) return
          navigateAndShowView(binding, options, args)
        })
      } else {
        navigateAndShowView(binding, options, args)
      }
    })
  }

  onGo(bindings.home, {
    view: 'topViews/home'
  })

  onGo(bindings.welcome, {
    unAuthOk: true
  , view: 'topViews/welcome'
  })

  onGo(bindings.login, {
    unAuthOk: true
  , view: 'topViews/login'
  })

  onGo(bindings.logout, {
    before: function(args, options, cb) {
      currentUser.logout()
      app.vent.trigger(bindings.welcome.message)
      cb(true)
    }
  })

  onGo(bindings.register, {
    unAuthOk: true
  , view: 'topViews/register'
  })

  onGo(bindings.forgotPassword, {
    unAuthOk: true
  , view: 'topViews/forgotPassword'
  })

  app.vent.on('go:404', function(args) {
    track('go:404', args)
    //forcePageReload('/' + args.fragment)
    showView('topViews/404')
  })

  app.start()

})

