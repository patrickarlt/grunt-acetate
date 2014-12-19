/*
 * grunt-acetate
 * https://github.com/patricklocal/grunt-acetate
 *
 * Copyright (c) 2014 Patrick Arlt
 * Licensed under the MIT license.
 */

'use strict';

var Acetate = require('acetate');
var path = require('path');
var _ = require('lodash');
var gaze = require('gaze');

module.exports = function(grunt) {

  grunt.registerMultiTask('acetate', 'Grunt plugin for the Acetate static site builter.', function() {
    var done = this.async();
    var data = this.data || grunt.config('acetate');
    var configPath = path.join(process.cwd(), data.config);
    var options = this.options({
      keepalive: false,
      server: false,
      watch: false,
      port: 3000,
      host: 'localhost',
      findPort: true,
      logLevel: 'verbose'
    });

    var acetate;

    function build() {
      acetate.build(function(){
        if(!options.keepalive) {
          done();
        }
      });
    }

    function run() {
      acetate = new Acetate(configPath);

      _.defaults(acetate.args, data.args);
      _.defaults(acetate.options, options);

      if(options.watch){
        acetate.watcher.start();
      }

      if(options.server && options.port){
        acetate.server.start(options.host, options.port, options.findPort);
      }

      acetate.load(function(){
        if(options.clean){
          acetate.clean(build);
        } else {
          build();
        }
      });
    }
    if(options.watch){
      gaze(data.config, function(error, watcher){

        // whenever it chagnes
        watcher.on('changed', function() {

          // stop the server if we were running it
          if(options.server && options.port){
            acetate.server.stop();
          }

          // stop the watcher if we were running it
          if(options.watch){
            acetate.watcher.stop();
          }

          // rerun everything
          run();

        });
      });
    }

    run();
  });
};
