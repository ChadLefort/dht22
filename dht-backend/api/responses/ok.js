/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

var _ = require('lodash');

module.exports = function sendOK (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  sails.log.silly('res.ok() :: Sending 200 ("OK") response');

  var response = _.assign({
    code: _.get(options, 'code', 'OK'),
    message: _.get(options, 'message', 'Operation is successfully executed'),
    data: data || {}
  }, _.get(options, 'root', {}));

  res.status(200);
  res.jsonx(response);

};
