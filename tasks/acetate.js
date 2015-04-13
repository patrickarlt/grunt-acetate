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
var _ = require('lodash');
var chokidar = require('chokidar');
var opener = require('opener');

module.exports = function(grunt) {

  grunt.registerMultiTask('acetate', 'Grunt plugin for the Acetate static site builter.', function() {
    var done = this.async();
    var target = this.target;
    var data = this.data || grunt.config('acetate');
    var site;
    var options = this.options({
      config: 'acetate.conf.js',
      root: process.cwd(),
      keepalive: false,
      server: false,
      watcher: false,
      port: 3000,
      host: 'localhost',
      findPort: true,
      open: false,
      clean: false,
      log: 'info',
      args: false
    });

    options.config = path.join(process.cwd(), data.config);

    var logHeader = false;

    grunt.event.on('watch', function() {
      grunt.log.writeln();
      logHeader = true;
    });

    function run(firstRun){
      logHeader = true;

      site = acetate(options, function(error){
        if(firstRun && options.open && options.server) {
          site.log.success('server', 'opening %s:%s', options.host, site.server.foundPort);
          opener('http://' + options.host + ':' + site.server.foundPort);
        }

        if(!options.keepalive && firstRun) {
          done();
        }
        console.log(site);
        site.on('log', function(e){
          if(e.show && logHeader){
            logHeader = false;
            grunt.log.header('Task "acetate:'+target+'" running');
          }
        });
      });
    }

    if (options.server || options.watcher) {
      chokidar.watch(options.config, {
        ignoreInitial: true
      }).on('change', function(){
        site.log.success('watcher', 'config file changed, rebuilding site');
        site.watcher.stop();
        site.server.stop();
        run();
      });
    }

    run(true);
  });
};
