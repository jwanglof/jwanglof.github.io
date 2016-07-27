var humanize = require('humanize');
var zlib = require('zlib');
var gzip = zlib.createGzip();
var fs = require('fs');

var prettyBytes = function(bytes) {
  return humanize.filesize(bytes);
};

module.exports = {
  stringSize: function(str, pretty) {
    var bytes = Buffer.byteLength(str);
    return (pretty) ? prettyBytes(bytes) : bytes;
  },
  fileSize: function(file, pretty, callback, gzip) {
    var self = this;
    if (typeof pretty == 'function') {
      callback = pretty;
      pretty = false;
    }
    fs.readFile(file, 'utf8', function(err, file) {
      if (gzip) {
        zlib.gzip(file, function(err, buf) {
          bytes = buf.length;
          bytes = (pretty) ? prettyBytes(bytes) : bytes;
          callback(err, bytes);
        });
      } else {
        callback(err, self.stringSize(file, pretty));
      }
    });
  },
  gzipSize: function(file, pretty, callback) {
    this.fileSize(file, pretty, callback, true);
  }
};
