// var _ = require('lodash');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    uglify: {
      options: { sourceMap: true },
      everything: {
        files: {
          'promise-state.min.js': 'promise-state.js'
        }
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      all: ['promise-state.js', 'test/*', 'Gruntfile.js']
    },

    karma: {
      all: {
        configFile: 'karma.conf.js'
      }
    }


  });

  // default to the watcher
  grunt.registerTask('default', ['jshint', 'uglify']);

};

