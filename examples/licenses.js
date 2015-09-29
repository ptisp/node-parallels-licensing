var PARALLELS = require('../parallels');

var config = {
    serverUrl: process.env.PARALLELS_SERVERURL,
    username: process.env.PARALLELS_USERNAME,
    password: process.env.PARALLELS_PASSWORD,
};

var parallelsexample = new PARALLELS(config);

var ips = ["127.0.0.1"];
var macs = [];

parallelsexample.licenses.getKeyNumbers(function(err, data){
  if (err) {
    console.log('ERROR');
    console.log(err);
  } else {
    console.log(data);
  }
});
