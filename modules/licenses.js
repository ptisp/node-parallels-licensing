var utils = require('../lib/utils');
var extend = utils.extend;

var Licenses = function(config) {
  this.config = config;
};

/**
 * getKeyNumbers (struct)
 * Searches for Key numbers by specified list of IPs and MACs; returns a list of
matching Key numbers. The result will be limited to licenses that are accessible
for the API account - there could be other licenses with these IP addresses not
included in the result.
 * @param ips[] -  ip array list.
 * @param macs[] - macs array list (optional).
 * @param callback
 */
Licenses.prototype.getKeyNumbers = function (ips, macs, callback) {
  var ip = [];
  var mac = [];
  ip = ip.concat(ips || []);
  mac = mac.concat(macs || []);

  var param={
    "login": this.config.username,
    "password": this.config.password
  };
  var p = {
    "ips": ip,
    "macs": mac
  };

  if(typeof macs === 'function'){
    callback = macs;
  }

  var fparams = [];
  fparams.push(param || []);
  fparams.push(p || []);

  utils.modem('partner10.getKeyNumbers', fparams, this.config, callback);
};

/**
 * getKeyInfo (struct, string)
 * Retrieves Key information by Key number.
 * @param key - String - key number in formats (PLSK.12345678.0001 or PLSK.12345678) or product/key activation code.
 * @param callback
 */
Licenses.prototype.getKeyInfo = function (key, callback) {
  var param={
    "login": this.config.username,
    "password": this.config.password
  };

  var fparams = [];
  fparams.push(param || []);
  fparams.push(key || "");

  utils.modem('partner10.getKeyInfo', fparams, this.config, callback);
};

/**
 * createKey (struct, struct, string, string, array)
 * Creates a Key with specified parameters.
 * @param serveraddr {
 *        			ip - String - ip server address
 *        			mac - String - mac server address. }
 * @param clientid - String - ID of the client who will own the created key
 * @param keytype - String - identifier of a keytype for new key
 * @param upgrades[] - Array - array of identifiers of upgrade plans that will be applied to the new key
 * @param callback
 */
Licenses.prototype.createKey = function (serveraddr, clientid, keytype, upgrades, callback) {

  var ip = [];
  var mac = [];
  ip = ip.concat(serveraddr.ip || []);
  mac = mac.concat(serveraddr.mac || []);

  var param={
    "login": this.config.username,
    "password": this.config.password
  };
  var p = {
    "ips": ip,
    "macs": mac
  };

  var fparams = [];
  fparams.push(param || []);
  fparams.push(p || []);
  fparams.push(clientid || "");
  fparams.push(keytype || "");

  if(typeof upgrades === 'function'){
    callback = upgrades;
  } else {
    fparams.push(upgrades || []);
  }

  utils.modem('partner10.createKey', fparams, this.config, callback);
};

/**
 * activateKey (struct, string, string)
 * Activates the specified Virtuozzo and HSPC Key with the specified HWID.
 * @param keynumber - String - key number or activation code of a key which should be activated
 * @param uid - String - UID to use while activating key
 * @param callback
 */
Licenses.prototype.activateKey = function (keynumber, uid, callback) {

  var param={
    "login": this.config.username,
    "password": this.config.password
  };

  var fparams = [];
  fparams.push(param || []);
  fparams.push(keynumber || "");

  if(typeof uid === 'function'){
    callback = uid;
  } else {
    fparams.push(uid || "");
  }

  utils.modem('partner10.activateKey', fparams, this.config, callback);
};

/**
 * renewKey (struct, string)
 * Renews an existing key.
 * @param keynumber - String - number of a key to upgrade
 * @param callback
 */
Licenses.prototype.renewKey = function (keynumber, callback) {

  var param={
    "login": this.config.username,
    "password": this.config.password
  };

  var fparams = [];
  fparams.push(param || []);
  fparams.push(keynumber || "");

  utils.modem('partner10.renewKey', fparams, this.config, callback);
};

/**
 * upgradeKey (struct, string, string)
 * Upgrades an existing Key with the upgrade plan defined in the method call.
 * @param keynumber - String - number of a key to upgrade
 * @param planname - String - upgrade plan name
 * @param callback
 */
Licenses.prototype.upgradeKey = function (keynumber, planname, callback) {

  var param={
    "login": this.config.username,
    "password": this.config.password
  };

  var fparams = [];
  fparams.push(param || []);
  fparams.push(keynumber || "");
  fparams.push(planname || "");

  utils.modem('partner10.upgradeKey', fparams, this.config, callback);
};




module.exports = Licenses;
