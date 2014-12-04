'use strict';

module.exports = function(grunt) {

  var watchFiles = {
    serverJS: ['server.js', 'gruntfile.js', 'app/**/*.js', 'test/**/*.js', 'config/**/*.js'],
    clientLESS: ['public/modules/**/*.less']
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: {
        src: watchFiles.serverJS,
        options: {
          jshintrc: true
        }
      }
    },
    watch: {
      serverJS: {
        files: watchFiles.serverJS,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      clientLESS: {
        files: watchFiles.clientLESS,
        tasks: ['less']
      }
    },
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js',
          watch: watchFiles.serverJS
        }
      }
    },
    concurrent: {
      default: ['nodemon', 'watch'],
      debug: ['nodemon', 'watch', 'node-inspector'],
      options: {
        logConcurrentOutput: true,
        limit: 10
      }
    },
    'node-inspector': {
      custom: {
        options: {
          'web-port': 1337,
          'web-host': 'localhost',
          'debug-port': 5858,
          'save-live-edit': true,
          'no-preload': true,
          'stack-trace-limit': 50,
          'hidden': []
        }
      }
    },
    less: {
      options: {
        paths: ['public/modules']
      },
      development: { files: {} }, // KEEP: This is needed for less to function
      production: { files: {} }, // KEEP: This is needed for less to function
      src: {
        expand: true,
        cwd: 'public/modules',
        src: ['**/*.less'],
        dest: 'public/modules',
        ext: '.less.css'
      }
    }
  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['lint', 'concurrent:default']);

  // Debug task.
  grunt.registerTask('debug', ['lint', 'concurrent:debug']);

  // Lint task(s).
  grunt.registerTask('lint', ['jshint']); // ['csslint']

};