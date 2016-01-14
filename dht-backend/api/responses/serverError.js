/**
 * 500 (Server Error) Response
 *
 * Usage:
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 *
 * NOTE:
 * If something throws in a policy or controller, or an internal
 * error is encountered, Sails will call `res.serverError()`
 * automatically.
 */

var _ = require('lodash');

module.exports = function serverError (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Log error to console
  if (data !== undefined) {
    sails.log.error('Sending 500 ("Server Error") response: \n',data);
  }
  else {
    sails.log.error('Sending empty 500 ("Server Error") response');
  }

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  if (sails.config.environment === 'production') {
    data = undefined;
  }

  var response = _.assign({
    code: _.get(options, 'code', 'E_INTERNAL_SERVER_ERROR'),
    message: _.get(options, 'message', 'Something bad happened on the server'),
    data: data || {}
  }, _.get(options, 'root', {}));

  res.status(500);
  res.jsonx(response);

};
