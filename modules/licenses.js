var utils = require('../lib/utils');
var extend = utils.extend;

var Licenses = function(config) {
  this.config = config;
};

/**
 * Searching for License Keys
 * @param {[type]}   opts
      ip-address-binding (string). It is used to filter licenses by the IP address that a license key is bound to. Can be both IPv4 and IPv6.
      nickname (string). It is used to filter licenses by an alias, custom tag, and other similar properties.
      uid (string). It is used to filter licenses by the UID with which a license is activated.
      product (string). It is used to filter licenses by product name aliases.
      status (string). It is used to filter licenses by status. The allowed values are active, expired, expiring, terminated, suspended.
      type (string). It is used to filter licenses by license type. The allowed values are master, trial, purchased, lease, lease1m, lease3m, lease6m, lease1y, lease2y, lease3y.
 * @param {Function} callback
 */
Licenses.prototype.getKeyNumbers = function (opts, callback) {
  if(typeof opts === 'function'){
    callback = opts;
  }

  var createOptions = {
    client: this,
    opt: opts
  };

  utils.modem('keys', 'GET', createOptions, callback);
};

/**
 * Retrieving a License Key Information
 * @param String   id       Key ID or Activation Code
 * @param {Function} callback
 */
Licenses.prototype.getKeyDetails = function (id, callback) {

  var createOptions = {
    client: this,
    opt: ''
  };

  utils.modem('keys/'+id, 'GET', createOptions, callback);
};

/**
 * Terminating a License Key
 * @param String   id       Key ID or Activation Code
 * @param {Function} callback
 */
Licenses.prototype.terminateKey = function (id, callback) {
  var createOptions = {
    client: this,
    opt: {'return-key-state':'yes'}
  };

  utils.modem('keys/'+id, 'DELETE', createOptions, callback);
};

/**
 * Terminating a License Key
 * @param String   id       Key ID or Activation Code
 * @param {Function} callback
 */
Licenses.prototype.renewKey = function (id, callback) {
  var createOptions = {
    client: this,
    opt: {'return-key-state':'yes'}
  };

  utils.modem('keys/'+id+'/renew', 'GET', createOptions, callback);
};

/**
 * Creating a License Key
 * @param {[type]}   opts
      ownerid - String - An ID of a license owner.
      keyIdentifiers - Empty Array -
      nickname - String - The text information about a license key (custom tag)
      items - Array -
        item - String -
      autoRenew - Boolean - Specifies whether a license key is renewed automatically by Key Administrator
 * @param {Function} callback
 */
 Licenses.prototype.createKey = function (opts, callback) {
   var createOptions = {
     client: this,
     opt: {'return-key-state':'yes'},
     body: opts
   };

   utils.modem('keys', 'POST', createOptions, callback);
 };

/**
 * Applies a promotion to a license key
 * @param  {string}   id       Key ID
 * @param  {string}   type    license item type
 * @param  {string}   promo   promo item name
 * @param  {Function} callback
 */
Licenses.prototype.applyPromo = function(id, type, promo, callback) {
  var opts = {
    items: [{
        item: type
      },
      {
        item: promo
      }
    ]
  };

  var createOptions = {
    client: this,
    opt: {
      'return-key-state': 'yes'
    },
    body: opts
  };

  utils.modem('keys/' + id, 'PUT', createOptions, callback);
};


module.exports = Licenses;
