var request = require('request'),
  qs = require('querystring'),
  hasOwnProperty = Object.prototype.hasOwnProperty;

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
        '@' + client.config.serverUrl + func + '?' + qs.stringify(requestopts),
      method: type,
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };

    request(serverOptions, function(err, response, body) {
      var data;
      if (body) {
        try {
          if (typeof body === 'string' || body instanceof String) {
            data = JSON.parse(body);
          } else {
            data = body;
          }
        } catch (error) {
          return callback('Type error');
        }
      }
      if (err || response.statusCode < 200 || response.statusCode > 299) {
        if (body) {
          return callback(data);
        } else {
          return callback('HTTP error');
        }
      }

      return callback(null, data);
    });
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
