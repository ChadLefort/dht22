/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 * return res.notFound(err);
 * return res.notFound(err, 'some/specific/notfound/view');
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 *
 * NOTE:
 * If a request doesn't match any explicit routes (i.e. `config/routes.js`)
 * or route blueprints (i.e. "shadow routes", Sails will call `res.notFound()`
 * automatically.
 */

var _ = require('lodash');

module.exports = function notFound (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 404 ("Not Found") response: \n', data);
  } else {
    sails.log.verbose('Sending 404 ("Not Found") response');
  }

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
      data = undefined;
  }

  var response = _.assign({
    code: _.get(options, 'code', 'E_NOT_FOUND'),
    message: _.get(options, 'message', 'The requested resource could not be found but may be available again in the future'),
    data: data || {}
  }, _.get(options, 'root', {}));

  res.status(404);
  res.jsonx(response);

};
