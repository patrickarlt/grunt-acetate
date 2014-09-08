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

module.exports = function(grunt) {

  grunt.registerMultiTask('acetate', 'Grunt plugin for the Acetate static site builter.', function() {
    var done = this.async();
    var data = this.data;
    var options = this.options({
      keepalive: false,
      server: false,
      watch: false,
      port: 3000
    });

    console.log(options);

    function build() {
      acetate.build(function(){
        console.log(options.keepalive);
        if(!options.keepalive) {
          done();
        }
      });
    }

    var acetate = new Acetate(path.join(process.cwd(), data.config));

    _.defaults(acetate.args, data.args);
    _.defaults(acetate.options, options);

    if(options.watch){
      acetate.watcher.start();
    }

    if(options.server && options.port){
      acetate.server.start(options.port);
    }

    acetate.load(function(){
      if(options.clean){
        acetate.clean(build);
      } else {
        build()
      }
    });
  });
};
