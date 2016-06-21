/*
 * grunt-acetate
 * https://github.com/patricklocal/grunt-acetate
 *
 * Copyright (c) 2014 Patrick Arlt
 * Licensed under the MIT license.
 */

'use strict';

var Acetate = require('acetate');
var server = require('acetate/lib/modes/server.js');
var watcher = require('acetate/lib/modes/watcher.js');
var builder = require('acetate/lib/modes/builder.js');

module.exports = function (grunt) {
  grunt.registerMultiTask('acetate', 'Grunt plugin for Acetate.', function () {
    var done = this.async();
    var target = this.target;
    var logHeader = false;
    var options = this.options({
      keepalive: false,
      args: {}
    });

    if (!options.mode) {
      grunt.fatal('no `mode` specificed in Acetate options.');
    }

    var acetate = new Acetate(options);

    // whenever we log anything spit out a header
    // cleaner output when using grunt watch
    function printLogHeader (e) {
      if (e.show && logHeader) {
        logHeader = false;
        grunt.log.header('Task "acetate:' + target + '" running');
      }
    }

    acetate.on('log', printLogHeader);

    // whenever grunt watch activates it spits out a header
    // we can spit out a header next time we log anything
    grunt.event.on('watch', function () {
      grunt.log.writeln();
      logHeader = true;
    });

    // rebind the log header whenever we restart Acetate
    acetate.on('config:loaded', function () {
      acetate.on('log', printLogHeader);
    });

    // if building end the task once we are done, unless keepalive is true
    if (options.mode === 'build') {
      builder(acetate).then(done).catch(done);
    }

    // if watching end the task as soon as the watcher starts, unless keepalive is true
    if (options.mode === 'watcher') {
      watcher(acetate);

      acetate.once('watcher:ready', function () {
        logHeader = true;
        if (!options.keepalive) {
          done();
        }
      });
    }

    // if serving end the task as soon as the server starts, unless keepalive is true
    if (options.mode === 'server') {
      server(acetate, options.server);

      acetate.once('watcher:ready', function () {
        logHeader = true;
        if (!options.keepalive) {
          done();
        }
      });
    }
  });
};
