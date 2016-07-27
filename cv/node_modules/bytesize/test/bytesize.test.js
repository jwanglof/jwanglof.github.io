var assert = require('assert');

var bytesize = require('../');

suite('bytesize', function() {

  test('stringSize', function() {
    var size = bytesize.stringSize('1 12 3 123 123');
    assert.equal(size, 14);
  });

  test('pretty stringSize', function() {
    var size = bytesize.stringSize('1 12 3 123 123', true);
    assert.equal(size, '14 bytes');
  });

  test('fileSize', function(done) {
    bytesize.fileSize(__dirname + '/fixtures/test.txt', function(err, size) {
      assert.equal(size, 6660);
      done();
    });
  });

  test('pretty fileSize', function(done) {
    bytesize.fileSize(__dirname + '/fixtures/test.txt', true, function(err, size) {
      assert.equal(size, '6.50 Kb');
      done();
    });
  });

  test('gzipSize', function(done) {
    bytesize.gzipSize(__dirname + '/fixtures/test.txt', function(err, size) {
      assert.equal(size, 190);
      done();
    });
  });

  test('pretty gzipSize', function(done) {
    bytesize.gzipSize(__dirname + '/fixtures/test.txt', true, function(err, size) {
      assert.equal(size, '190 bytes');
      done();
    });
  });

});

