/*
 * grunt-acetate
 * https://github.com/patricklocal/grunt-acetate
 *
 * Copyright (c) 2014 Patrick Arlt
 * Licensed under the MIT license.
 */

'use strict';

var acetate = require('acetate');
var path = require('path');
var chokidar = require('chokidar');
var opener = require('opener');

module.exports = function (grunt) {
  grunt.registerMultiTask('acetate', 'Grunt plugin for Acetate.', function () {
    var done = this.async();
    var target = this.target;
    var logHeader = false;
    var site;
    var options = this.options({
      keepalive: false,
      open: false,
      args: {}
    });

    function run () {
      site = acetate(options);

      // whenever we log anything spit out a header
      // cleaner output when using grunt watch
      site.on('log', function (e) {
        if (e.show && logHeader) {
          logHeader = false;
          grunt.log.header('Task "acetate:' + target + '" running');
        }
      });
    }

    // create the site
    run();

    // whenever grunt watch activates it spits out a header
    // we can spit out a header next time we log anything
    grunt.event.on('watch', function () {
      grunt.log.writeln();
      logHeader = true;
    });

    // if building end the task once we are done
    if (!options.keepalive) {
      site.once('build', function (e) {
        done();
      });
    }

    // if serving open the site once we are done building
    if (options.server && options.open) {
      site.once('server:start', function (e) {
        site.log.success('server', 'opening %s:%s', e.host, e.port);
        opener('http://' + e.host + ':' + e.port);
      });
    }

    // if watching or serving watch the config file and rebuild the whole site
    if (options.server || options.watcher) {
      chokidar.watch(path.join(options.root, options.config), {
        ignoreInitial: true
      }).on('change', function () {
        site.log.info('watcher', 'config file changed, rebuilding site');
        site.stopWatcher.stop();
        site.stopServer.stop();
        site.removeAllListeners('log');

        // recreate the site
        run();
      });
    }
  });
};
