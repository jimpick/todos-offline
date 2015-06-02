module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.registerTask('default', 'concurrent:serve')
  grunt.registerTask('release', [
    'browserify:release'
  , 'exorcise'
  , 'uglify:release'
  ])

  grunt.initConfig({
    nodemon: {
      serve: {
        script: './server/server'
      , options: {
          watch: [
            'server'
          ]
        }
      }
    }
  , concurrent: {
      serve: {
        // tasks: ['browserify:watch', 'nodemon:serve']
        tasks: ['webpack:watch', 'nodemon:serve']
      , options: {
          logConcurrentOutput: true
        }
      }
    }
  , webpack: {
      watch: {
        entry: './www/static/marty/app/index.js'
      , output: {
          path: __dirname + '/www/static/marty/dist'
        , filename: 'todomvc-webpack.js'
        }
      , module: {
          loaders: [
            {
              test: /\.js$/
            , exclude: /(node_modules|bower_components|vendor)/
            , loader: 'babel'
            }
          ]
        , noParse: /\/levelup\//
        }
      , devtool: '#source-map'
      , watch: true
      , keepalive: true
      }
    }
  , browserify: {
      watch: {
        src: 'www/static/marty/app/**/*.js'
      , dest: 'www/static/marty/dist/todomvc.js'
      , options: {
          watch: true
        , keepAlive: true
        , transform: ['babelify']
        , browserifyOptions: {
            debug: true
          }
        }
      }
    , release: {
        src: 'www/static/marty/app/**/*.js'
      , dest: 'www/static/marty/dist/todomvc-dist.js'
      , options: {
          transform: ['babelify']
        , browserifyOptions: {
            debug: true
          }
        }
      }
    }
  , exorcise: {
      bundle: {
        files: {
          'www/static/marty/dist/todomvc-dist.map': [
            'www/static/marty/dist/todomvc-dist.js'
          ]
        }
      }
    }
  , uglify: {
      release: {
        options: {
          sourceMap: true
        , sourceMapIncludeSources: true
        , sourceMapIn: 'www/static/marty/dist/todomvc-dist.map'
        },
        files: {
          'www/static/marty/dist/todomvc-dist.min.js': [
            'www/static/marty/dist/todomvc-dist.js'
          ]
        }
      }
    }
  })

}
