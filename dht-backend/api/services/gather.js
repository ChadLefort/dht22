/**
 * Gather
 *
 * @description :: Gathers data from DHT sensor
 */

var dht = require('beaglebone-dht');

module.exports = {
    start: function() {
      this.gathering = true;
      console.log('Temp data gathering has started.');
      dht.sensor('DHT22');

      this.gatherTempData = setInterval(function() {
        var read = dht.read('P9_15');

        if (!_.isUndefined(read)) {
          Dht.create({
              celsius: read.celsius,
              fahrenheit: read.fahrenheit,
              humidity: read.humidity
          }).then(function(dht) {
              Dht.publishCreate(dht);
          }).catch(function(error) {
              console.log(error);
          });
        }
      }, 20000);
      //1200000
    },

    stop: function() {
      this.gathering = false;
      clearInterval(this.gatherTempData);
      console.log('Temp data gathering has stopped.');
    },
    
    status: function () {
      return this.gathering;
    }
};
