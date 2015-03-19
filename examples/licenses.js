var PARALLELS = require('../parallels');

var config = {
    serverUrl: 'https://ka.parallels.com:7050',
    username: process.env.PARALLELS_USER,
    password: process.env.PARALLELS_PASSWORD,
};

var parallelsexample = new PARALLELS(config);

var ips = ["127.0.0.1"];
var macs = [];

parallelsexample.licenses.getKeyNumbers(ips, macs, function(err, data){
  if (err) {
    console.log('ERROR');
    console.log(err);
  } else {
    console.log(data);
  }
});
