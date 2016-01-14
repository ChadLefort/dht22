import * as _ from 'lodash';
import * as toastr from 'toastr';
import {Dht, Output} from '../models/dht-model';
import {DhtService} from '../services/dht-service';

export class DhtController {
  static $inject = ['$sails', 'DhtService'];

  temperatures: Array<Dht>;
  chart: any;
  output: Output;

  constructor(private $sails: any, private dhtService: DhtService) {
    this.output = new Output();
    this.temperatures = [];

    // init
    this.getTempData();
    this.getSocketTempData();
    this.chart = this.dhtService.getChart();

    // toastr options
    toastr.options.preventDuplicates = true;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  drawChart(): void {
    this.output = {
      fahrenheit: _.take(_.pluck(this.temperatures, 'fahrenheit'), 20).reverse(),
      celsius: _.take(_.pluck(this.temperatures, 'celsius'), 20).reverse(),
      humidity: _.take(_.pluck(this.temperatures, 'humidity'), 20).reverse(),
      createdAt: _.take(_.pluck(this.temperatures, 'createdAt'), 20).reverse()
    }

    this.chart.xAxis.categories = this.output.createdAt;
    this.chart.series[0].data = this.output.fahrenheit;
    this.chart.series[1].data = this.output.celsius;
    this.chart.series[2].data = this.output.humidity;
  }

  getTempData():void {
    this.dhtService.getTempData()
      .then(response => {
        _.forEach(response.data, (temp: Dht) => {
          let dht = new Dht(temp.fahrenheit, temp.celsius, temp.humidity, temp.createdAt);
          this.temperatures.push(dht);
        });

        this.drawChart();
      });
  }

  getSocketTempData(): void {
    this.$sails.get('/api/dht');

    this.$sails.on('dht', response => {
      let dht = new Dht(response.data.fahrenheit, response.data.celsius, response.data.humidity, response.data.createdAt);

      this.temperatures.unshift(dht);
      this.drawChart();
      toastr.info('New temperature has been added!');
    });
  }
}
