var jam = {
    "packages": [
        {
            "name": "Backbone.BabySitter",
            "location": "vendor/jam/Backbone.BabySitter",
            "main": "lib/amd/backbone.babysitter.js"
        },
        {
            "name": "Backbone.Marionette",
            "location": "vendor/jam/Backbone.Marionette",
            "main": "lib/core/amd/backbone.marionette.js"
        },
        {
            "name": "Backbone.Wreqr",
            "location": "vendor/jam/Backbone.Wreqr",
            "main": "lib/amd/backbone.wreqr.js"
        },
        {
            "name": "backbone",
            "location": "vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "requirejs-plugins",
            "location": "vendor/jam/requirejs-plugins"
        },
        {
            "name": "underscore",
            "location": "vendor/jam/underscore",
            "main": "underscore.js"
        }
    ],
    "version": "0.2.17",
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "Backbone.BabySitter",
            "location": "vendor/jam/Backbone.BabySitter",
            "main": "lib/amd/backbone.babysitter.js"
        },
        {
            "name": "Backbone.Marionette",
            "location": "vendor/jam/Backbone.Marionette",
            "main": "lib/core/amd/backbone.marionette.js"
        },
        {
            "name": "Backbone.Wreqr",
            "location": "vendor/jam/Backbone.Wreqr",
            "main": "lib/amd/backbone.wreqr.js"
        },
        {
            "name": "backbone",
            "location": "vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "requirejs-plugins",
            "location": "vendor/jam/requirejs-plugins"
        },
        {
            "name": "underscore",
            "location": "vendor/jam/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "Backbone.BabySitter",
            "location": "vendor/jam/Backbone.BabySitter",
            "main": "lib/amd/backbone.babysitter.js"
        },
        {
            "name": "Backbone.Marionette",
            "location": "vendor/jam/Backbone.Marionette",
            "main": "lib/core/amd/backbone.marionette.js"
        },
        {
            "name": "Backbone.Wreqr",
            "location": "vendor/jam/Backbone.Wreqr",
            "main": "lib/amd/backbone.wreqr.js"
        },
        {
            "name": "backbone",
            "location": "vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "jquery",
            "location": "vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "requirejs-plugins",
            "location": "vendor/jam/requirejs-plugins"
        },
        {
            "name": "underscore",
            "location": "vendor/jam/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "underscore",
                "jquery"
            ],
            "exports": "Backbone"
        },
        "underscore": {
            "exports": "_"
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}