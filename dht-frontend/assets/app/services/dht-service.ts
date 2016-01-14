import {Dht} from '../models/dht-model';

export class DhtService {
  static $inject = ['$http', '$timeout'];

  serviceRoot: string = 'http://piglet-bbb:1337/api';

  constructor(private $http: ng.IHttpService, private $timeout: ng.ITimeoutService) {
  }

  getChart(): any {
    return {
      title: {
        text: 'Temperature'
      },
      size: {
        height: 760
      },
      yAxis: {
        title: {
          text: 'Temperature'
        }
      },
      xAxis: {},
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
      },
      series: [
        {
          name: 'Fahrenheit',
					color: '#AA3B3B',
          marker: {
            symbol: 'circle'
          }
        }, {
          name: 'Celsius',
					color: '#1A8FD5',
          marker: {
            symbol: 'circle'
          }
        }, {
          name: 'Humidity',
          color: '#222324',
          marker: {
            symbol: 'circle'
          }
        }
      ],
      func: chart => {
        this.$timeout(() => {
          chart.reflow();
        }, 0);
      }
    };
  }

  getTempData(): ng.IHttpPromise<Array<Dht>> {
    return this.$http.get(`${this.serviceRoot }/dht?sort=id desc`);
  }

}
