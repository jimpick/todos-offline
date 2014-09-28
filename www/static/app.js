define([
  "jquery"
, "backbone"
, "Backbone.Marionette"
, "vendor/backblend/bypass"  // send links to router
, "models/currentUser"
], function(
  $
, Backbone
, marionette
, bypass
, currentUser
) {

  var app = new Backbone.Marionette.Application()

  app.addRegions({
    appHeader: ".headerRegion"
  , mainRegion: ".content"
  , appFooter: ".footerRegion"
  , modal: ".modalContainer"
  })

  if (globalOpts.cordova) {
    var root = window.location.href.replace('file://','')
  } else {
    var root = '/'
    if (globalOpts.pushState && !window.history.pushState) {
      root = '/app'
      if (window.location.href[window.location.href.length - 1] != '#' &&
          !window.location.hash) {
        window.location.replace('/app#' + window.location.pathname.substr(1))
      }
    }
  }

  app.addInitializer(function(options) {
    currentUser.set(globalOpts.user)
    currentUser.set('loggedIn', globalOpts.isLoggedIn)
    Backbone.history.start({
      pushState: globalOpts.pushState
    , root: root
    })
  })

  return app

})

