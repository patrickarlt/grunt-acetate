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

    var options = this.options({
      watch: false
    });

    var data = this.data;

    Acetate.init(function(error, acetate){
      // override any args in the acetate args with the grunt args object
      _.defaults(acetate.args, data.args);

      acetate.loadConfig(path.join(process.cwd(), data.config));

      // override any options in the acetate options with the grunt options
      _.defaults(acetate.options, options);

      acetate.build(function(){
        if(options.watch){
          acetate.watcher.start();
        } else {
          done();
        }
      });
    });
  });
};
