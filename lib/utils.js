var request = require('request'),
  zlib = require('zlib'),
  JSONStream = require('JSONStream');
var hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = {
  /**
   * Effectuate HTTP request
   * @param options {*}
   * @param callback
   */

  modem: function(func, type, options, callback) {
    var requestBody, client;

    client = options.client;
    requestBody = options.body;
    requestopts = options.opt;

    var serverOptions = {
      uri: 'https://' + client.config.username + ':' + client.config.password +
        '@' + client.config.serverUrl + func + '?' + require('querystring').stringify(requestopts),
      method: type,
      headers: {
        'Accept-Encoding': 'gzip'
      },
      encoding: null
    };

    serverOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
    serverOptions.body = JSON.stringify(requestBody);


    var compressedRequest = function(options, outStream) {
      var req = request(serverOptions);

      req.on('response', function(res) {

        var encoding = res.headers['content-encoding'];
        if (encoding == 'gzip') {
          res.pipe(zlib.createGunzip()).pipe(outStream);
        } else if (encoding == 'deflate') {
          res.pipe(zlib.createInflate()).pipe(outStream);
        } else {
          res.pipe(outStream);
        }
      });

      req.on('error', function(err) {
        throw err;
      });
    };

    var outStream = JSONStream.parse();

    outStream.on('root', onStreamEvent);
    outStream.on('end', onStreamEnd);

    var output = [];
    function onStreamEvent(evt) {
      output.push(evt);
    }
    function onStreamEnd() {
      return callback(null, output);
    }

    compressedRequest(options, outStream);
  },

  /**
   * Pass in `arguments` to get back a proper Array
   * @returns {Array.<T>}
   */
  getArgs: function() {
    return Array.prototype.slice.call(arguments);
  },

  /**
   * Extend properties of one object with one or more Objects
   * Copied from Underscore - http://underscorejs.org/
   * @param obj Object
   * @returns Object
   */
  extend: function(obj) {
    if (typeof obj !== 'object') return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};
