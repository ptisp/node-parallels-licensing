var request = require('request');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var xml2js = require('xml2js');
var rpc = require('xmlrpc');

module.exports = {
  /**
   * Effectuate HTTP request
   * @param options {*}
   * @param callback
   */

  modem: function(func, params, options, callback) {
    var requestBody, client;

    client = options;
    requestBody = options.body;

    var xmlClient = rpc.createSecureClient(client.serverUrl);

    xmlClient.methodCall(func, params, function(error, value) {
      if (error) return callback(error);

      var success = Boolean(value[0]);
      var message = value[1];

      if (success === false) {
        return callback(new Error(message));
      }

      if(!ignore && typeof message === 'string' && message.length > 0) {
        xml2js.parseString(message, {
          'explicitArray': false
        }, function(err, result) {
          if (err) return callback(new Error('error parsing xml'));
          callback(null, result);
        });
      } else {
        callback(null, message || {});
      }

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
