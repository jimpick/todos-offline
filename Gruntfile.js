module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

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
        tasks: ['browserify:watch', 'nodemon:serve']
      , options: {
          logConcurrentOutput: true
        }
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
    }
  })

  grunt.registerTask('default', 'concurrent:serve')

}
