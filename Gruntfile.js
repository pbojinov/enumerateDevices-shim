'use strict';

/* For jshint: */
/* globals module, require */

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      adapterGlobalObject: {
        src: ['./src/js/index.js'],
        dest: './dist/enumerate-devices-shim.js',
        options: {
          browserifyOptions: {
            // Exposes shim methods in a global object to the browser.
            // The tests require this.
            // TODO: Replace adapter with <%= pkg.name %>' which uses the name
            // from package.json once we have a better NPM name.
            standalone: 'adapter'
          }
        }
      },
      // Use this if you do not want adapter to expose anything to the global
      // scope.
      adapterAndNoGlobalObject: {
        src: ['./src/js/index.js'],
        dest: './dist/enumerate-devices-shim-no-global.js'
      },
    },
    githooks: {
      all: {
        'pre-commit': 'lint'
      }
    },
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: ['src/**/*.js', 'test/*.js']
    },
  });

  grunt.loadNpmTasks('grunt-githooks');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['eslint', 'browserify']);
  grunt.registerTask('lint', ['eslint']);
  grunt.registerTask('build', ['browserify']);
};
