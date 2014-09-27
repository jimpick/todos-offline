// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["vendor/jam/require.config", "main"]

, paths: {
    "text": "vendor/jam/requirejs-plugins/text"
  , "json": "vendor/jam/requirejs-plugins/json"
  , "backbone.babysitter": "vendor/jam/Backbone.BabySitter/" +
      "lib/amd/backbone.babysitter"
  , "backbone.wreqr": "vendor/jam/Backbone.Wreqr/" +
      "lib/amd/backbone.wreqr"
  }

, shim: {
    "swfobject": {
      exports: "swfobject"
    } 
  }

, map: {
  }

, waitSeconds: 20 // Default is 7 seconds

})


