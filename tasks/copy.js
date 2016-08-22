var fs = require('fs');
var p = require('path');
var folder = p.join(__dirname, '../src/');
var targetFolder = p.join(__dirname, '../public/');

function copy(path, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  var stats = fs.lstatSync(path);

  if (stats.isDirectory()) {
    for (var subPath of fs.readdirSync(path)) {
      var absPath = p.join(path, '/', subPath);
      var targetAbsPath = p.join(target, '/', subPath);
      var subStats = fs.lstatSync(absPath);

      if (subStats.isFile()) {
        fs.writeFileSync(targetAbsPath, fs.readFileSync(absPath));
      } else if (subStats.isDirectory()) {
        copy(absPath, targetAbsPath);
      }
    }
  }
}

console.log('Copying assets from folder:', folder);
console.log('To folder:', targetFolder);

copy(folder, targetFolder);

console.log('Finished copying.');
