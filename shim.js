
var shim = require('./conf/shim.config');

if (!shim.libs) shim.libs = {};
if (!shim.exports) shim.exports = {};

var shimlibs = Object.keys(shim.libs);
var config = JSON.stringify(shim.exports);
shimlibs.forEach(function(lib){
    config = config.replace(new RegExp('"'+lib+'":','g'), '"' + shim.libs[lib] + '":');
});

module.exports = JSON.parse(config);