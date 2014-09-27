define([
  "jquery"
], function(
  jQuery
) {
  Parse.$ = jQuery
  Parse.initialize(
    globalOpts.parse.applicationKey
  , globalOpts.parse.javascriptKey
  )

  return Parse
})

