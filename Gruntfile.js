var _ = require('underscore')
var config = require('./config')

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  , browserify: {
      dist: {
        src: 'www/static/marty/app/**/*.js'
      , dest: 'www/static/marty/dist/todomvc.js'
      , options: {
          transform: [
            'babelify'  
          ]
        }
      }
    }
  })

  if (config.devMode) {

    grunt.registerTask('nodeServer',
      function() {
        var done = this.async()

        _.extend(process.env, grunt.config.get('pkg.herokuDevSettings'))
        require('./server/server')
        // Never call done()
      }
    )

    grunt.registerTask('default', ['browserify', 'nodeServer'])
  }
}
