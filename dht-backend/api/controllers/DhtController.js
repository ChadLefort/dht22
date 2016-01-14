/**
 * DhtController
 *
 * @description :: Server-side logic for managing dhts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * Starts reading data from the DHT sensor
	 *
	 * @param {Object} req
	 * @param {Object} res
	 */
	start: function(req, res) {
		var response = {
			code: 'OK',
			message: 'Temp data is already being gathered.'
		};
		
		var status = gather.status();
		
		if (!status) {
			gather.start();
			response.message = 'Temp data gathering has started.';
		}

		res.status(200);
		res.jsonx(response);
	},

	/**
	 * Stops reading data from the DHT sensor
	 *
	 * @param {Object} req
	 * @param {Object} res
	 */
	stop: function(req, res) {
		var response = {
			code: 'OK',
			message: 'Temp data gathering has already been stopped.'
		};
		
		var status = gather.status();
		
		if (status) {
			gather.stop();
			response.message = 'Temp data gathering has stopped.';
		}

		res.status(200);
		res.jsonx(response);
	},
	
	/**
	 * Gives data gathering status
	 *
	 * @param {Object} req
	 * @param {Object} res
	 */
	status: function(req, res) {
		var response = {
			code: 'OK',
			message: 'Operation is successfully executed',
			gathering: gather.status()
		};
		
		res.status(200);
		res.jsonx(response);
	}
};
