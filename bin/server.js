var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var port = 8080;

http.createServer(function(request, response) {
  var uri = url.parse(request.url).pathname;
  var filename = path.join(__dirname, '../public/' , uri);
  var mimeTypes = {
    'css': 'text/css',
    'html': 'text/html',
    'js': 'text/javascript',
    'png': 'image/png',
    'jpg': 'image/jpg',
    'svg': 'image/svg+xml'
  };

  fs.stat(filename, function(err, stats) {
    if(err) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404 Not Found\n');
      response.end();
      return;
    }

    if (stats.isDirectory()) filename += '/index.html';

    fs.readFile(filename, 'binary', function(err, file) {
      if(err) {
        response.writeHead(500, {'Content-Type': 'text/plain'});
        response.write(err + '\n');
        response.end();
        return;
      }

      var mimeType = mimeTypes[filename.slice(filename.lastIndexOf('\.') + 1)];

      response.writeHead(200, {'Content-Type': mimeType});
      response.write(file, 'binary');
      response.end();
    });
  });
}).listen(parseInt(port, 10));

console.log('Evergreen application is available at\n' +
  '=> http://localhost:' + port + '/\nCTRL + C to shutdown');

// Watch

var exec = require('child_process').exec;
var cmd = 'npm run copy';
var folder = path.join(__dirname, '../src');

console.log('Started watching for changes on:', folder);

fs.watch(folder, { recursive: true }, function(e, fileChanged) {
  console.log('File changes detected on:', fileChanged);

  exec(cmd, function(err) {
    console.log('Running build again.');

    if (err) {
      console.error('Error:', err);
      return;
    }

    console.log('Finished re-running build.');
  });
});
