var fs = require('fs');

process.on('SIGINT', function() {
  process.exit();
});

var volKey = 'voluntary_ctxt_switches';
var nonVolKey = 'nonvoluntary_ctxt_switches';

var statusFile = '/proc/' + process.pid + '/status';

var dumpStats = function dumpStats() {
  fs.readFile(statusFile, function(err, data) {
    if (err) {
      throw err;
    }
    var rows = data.toString().split("\n");
    var fields = {};
  
    rows.forEach(function(v) {
      var kv = v.split(":\t");
      if (kv[0] && kv[1]) {
      	fields[kv[0]] = kv[1].trim();
  		}
    });
  
    console.log(fields);
  });
}

setInterval(dumpStats, 100);


