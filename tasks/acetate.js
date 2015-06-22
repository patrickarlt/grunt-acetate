/*
 * grunt-acetate
 * https://github.com/patricklocal/grunt-acetate
 *
 * Copyright (c) 2014 Patrick Arlt
 * Licensed under the MIT license.
 */

'use strict';

var acetate = require('acetate');

module.exports = function (grunt) {
  grunt.registerMultiTask('acetate', 'Grunt plugin for Acetate.', function () {
    var done = this.async();
    var target = this.target;
    var logHeader = false;
    var site;
    var options = this.options({
      keepalive: false,
      args: {}
    });

    if (!options.mode) {
      grunt.fatal('no `mode` specificed in Acetate options.');
    }

    site = acetate(options);

    // whenever we log anything spit out a header
    // cleaner output when using grunt watch
    function printLogHeader (e) {
      if (e.show && logHeader) {
        logHeader = false;
        grunt.log.header('Task "acetate:' + target + '" running');
      }
    }

    site.on('log', printLogHeader);

    // whenever grunt watch activates it spits out a header
    // we can spit out a header next time we log anything
    grunt.event.on('watch', function () {
      grunt.log.writeln();
      logHeader = true;
    });

    // rebind the log header whenever we restart Acetate
    site.on('restart', function (newSite) {
      newSite.on('log', printLogHeader);
      site = newSite;
    });

    // if building end the task once we are done, unless keepalive is true
    if (options.mode === 'build' && !options.keepalive) {
      site.once('build', function (e) {
        done();
      });
    }

    // if serving end the task as soon as the server starts, unless keepalive is true
    if (options.mode === 'watch' && !options.keepalive) {
      site.once('watcher:ready', function () {
        logHeader = true;
        done();
      });
    }

    // if serving end the task as soon as the server starts, unless keepalive is true
    if (options.mode === 'server' && !options.keepalive) {
      site.once('server:ready', function () {
        logHeader = true;
        done();
      });
    }
  });
};
