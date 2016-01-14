/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

var _ = require('lodash');

module.exports = function forbidden (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 403 ("Forbidden") response: \n',data);
  } else {
    sails.log.verbose('Sending 403 ("Forbidden") response');
  }

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    data = undefined;
  }

  var response = _.assign({
    code: _.get(options, 'code', 'E_FORBIDDEN'),
    message: _.get(options, 'message', 'User not authorized to perform the operation'),
    data: data || {}
  }, _.get(options, 'root', {}));

  res.status(403);
  res.jsonx(response);

};
