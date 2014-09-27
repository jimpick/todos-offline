var _ = require('underscore')
  , config = require('./config')

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json')

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

    grunt.registerTask('default', ['nodeServer'])
  }
}
