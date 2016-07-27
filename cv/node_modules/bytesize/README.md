#bytesize

##Installation

`npm install bytesize`

##Usage

```
var bytesize = require('bytesize');

//string size
var size = bytesize.stringSize('1 12 3 123 123');
//size == 14

//string size
var size = bytesize.stringSize('1 12 3 123 123', true);
//size == 14B

//file size
bytesize.fileSize(__dirname + '/fixtures/test.txt', function(err, size) {
//size == 6660
});

//pretty file size
bytesize.fileSize(__dirname + '/fixtures/test.txt', true, function(err, size) {
//size == '6.50KB'
});

//gzip file size
bytesize.gzipSize(__dirname + '/fixtures/test.txt', function(err, size) {
//size == 190
});

//pretty gzip file size
bytesize.gzipSize(__dirname + '/fixtures/test.txt', true, function(err, size) {
//size == '190B'
});
```
