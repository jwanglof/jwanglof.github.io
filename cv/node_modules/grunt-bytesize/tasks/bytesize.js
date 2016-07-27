/*
 * grunt-bytesize
 * https://github.com/jgallen23/grunt-bytesize
 *
 * Copyright (c) 2013 Greg Allen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  //
  var bytesize = require('bytesize');
  var path = require('path');

  grunt.registerMultiTask('bytesize', 'Your task description goes here.', function() {

    var done = this.async();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      grunt.util.async.mapSeries(f.src, function(file, callback) {

        bytesize.fileSize(file, true, function(err, size) {

          bytesize.gzipSize(file, true, function(err, gzipSize) {
            callback(null, {
              file: file,
              size: size,
              gzipSize: gzipSize
            });
          });

        });
      }, function(err, results) {
        results.forEach(function(result) {
          grunt.log.subhead(result.file);
          grunt.log.writeln('Size:\t\t'+result.size);
          grunt.log.writeln('Gzip Size:\t'+result.gzipSize);
        });

        done();
      });

    });
  });

};
