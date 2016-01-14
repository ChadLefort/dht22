/**
 * 400 (Bad Request) Handler
 *
 * Usage:
 * return res.badRequest();
 * return res.badRequest(data);
 * return res.badRequest(data, 'some/specific/badRequest/view');
 *
 * e.g.:
 * ```
 * return res.badRequest(
 *   'Please choose a valid `password` (6-12 characters)',
 *   'trial/signup'
 * );
 * ```
 */

var _ = require('lodash');

module.exports = function badRequest(data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 400 ("Bad Request") response: \n',data);
  }
  else {
    sails.log.verbose('Sending 400 ("Bad Request") response');
  }

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    data = undefined;
  }

  var response = _.assign({
    code: _.get(options, 'code', 'E_BAD_REQUEST'),
    message: _.get(options, 'message', 'The request cannot be fulfilled due to bad syntax'),
    data: data || {}
  }, _.get(options, 'root', {}));

  res.status(400);
  res.jsonx(response);

};
