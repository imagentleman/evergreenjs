var fs = require('fs');
var p = require('path');
var folder = p.join(__dirname, '../public/');

function del(path) {
  if (!fs.existsSync(path)) {
    return;
  }

  var stats = fs.lstatSync(path);

  if (stats.isDirectory()) {
    for (var subPath of fs.readdirSync(path)) {
      var absPath = p.join(path, '/', subPath);
      var subStats = fs.lstatSync(absPath);

      if (subStats.isFile()) {
        fs.unlinkSync(absPath);
      } else if (subStats.isDirectory()) {
        del(absPath);
      }
    }

    if (path !== folder) {
      fs.rmdirSync(path);
    }
  } else {
    fs.unlinkSync(path);
  }
}

console.log('Cleaning folder:', folder);

del(folder);

console.log('Finished cleaning.');
