/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * Welcomes the user to the api
   *
   * @param {Object} req
   * @param {Object} res
   */
  welcome: function(req, res) {
    var response = {
      code: 'OK',
      message: 'Welcome to the DHT api!'
    };

    res.status(200);
    res.jsonx(response);
  },
};
